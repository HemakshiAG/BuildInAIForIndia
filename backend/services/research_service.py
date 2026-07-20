import requests
from typing import List, Dict, Any
from ..ml.pipeline import embed_texts, save_faiss_index
from ..ml.pipeline import build_index_from_db
import json
from pathlib import Path
from ..database import SessionLocal
from ..repositories.research_repo import save_papers

OPENALEX_URL = "https://api.openalex.org/works"
EUROPE_PMC_SEARCH = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"
PUBMED_ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
PUBMED_EFETCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"


def ingest_openalex(query: str, per_page: int = 5) -> List[dict]:
    params = {"search": query, "per-page": per_page}
    r = requests.get(OPENALEX_URL, params=params, timeout=10)
    r.raise_for_status()
    data = r.json()
    items = []
    for item in data.get("results", [])[:per_page]:
        title = item.get("title")
        abstract = item.get("abstract_inverted_index")
        if isinstance(abstract, dict):
            abstract = " ".join([" ".join(map(str, tokens)) for tokens in abstract.values()])
        url = item.get("id")
        source_id = item.get("id")
        if abstract is None:
            abstract = ""
        items.append({"source_id": source_id, "title": title, "abstract": abstract, "url": url})
    texts = [f"{i['title']}\n\n{i['abstract']}" for i in items]
    embeddings = embed_texts(texts)
    # persist to DB and create embedding rows
    db = SessionLocal()
    try:
        papers = save_papers(db, items)
        # ensure we have same length
        from ..repositories.embeddings_repo import create_embeddings
        create_embeddings(db, papers, embeddings)
        # build index metadata with paper_id
        meta_items = []
        for p, it in zip(papers, items):
            meta_items.append({"paper_id": p.id, **it})
        save_faiss_index(embeddings, meta_items)
    finally:
        db.close()
    return items


def ingest_europepmc(query: str, pageSize: int = 5) -> List[dict]:
    params = {"query": query, "format": "json", "pageSize": pageSize}
    r = requests.get(EUROPE_PMC_SEARCH, params=params, timeout=10)
    r.raise_for_status()
    data = r.json()
    items = []
    for e in data.get("resultList", {}).get("result", [])[:pageSize]:
        title = e.get("title")
        abstract = e.get("abstractText") or ""
        source_id = e.get("id")
        url = e.get("url")
        items.append({"source_id": source_id, "title": title, "abstract": abstract, "url": url})
    texts = [f"{i['title']}\n\n{i['abstract']}" for i in items]
    embeddings = embed_texts(texts)
    db = SessionLocal()
    try:
        papers = save_papers(db, items)
        from ..repositories.embeddings_repo import create_embeddings
        create_embeddings(db, papers, embeddings)
        meta_items = []
        for p, it in zip(papers, items):
            meta_items.append({"paper_id": p.id, **it})
        save_faiss_index(embeddings, meta_items)
    finally:
        db.close()
    return items


def ingest_pubmed(query: str, retmax: int = 5) -> List[dict]:
    # Use E-utilities esearch + efetch to retrieve summaries
    params = {"db": "pubmed", "term": query, "retmode": "json", "retmax": retmax}
    r = requests.get(PUBMED_ESEARCH, params=params, timeout=10)
    r.raise_for_status()
    data = r.json()
    ids = data.get("esearchresult", {}).get("idlist", [])
    items = []
    if not ids:
        return items
    id_str = ",".join(ids)
    params2 = {"db": "pubmed", "id": id_str, "retmode": "xml"}
    r2 = requests.get(PUBMED_EFETCH, params=params2, timeout=10)
    # For simplicity return minimal metadata (parsing XML is more involved)
    for pid in ids:
        items.append({"source_id": pid, "title": f"PubMed:{pid}", "abstract": "", "url": f"https://pubmed.ncbi.nlm.nih.gov/{pid}/"})
    texts = [f"{i['title']}\n\n{i['abstract']}" for i in items]
    embeddings = embed_texts(texts)
    db = SessionLocal()
    try:
        papers = save_papers(db, items)
        from ..repositories.embeddings_repo import create_embeddings
        create_embeddings(db, papers, embeddings)
        meta_items = []
        for p, it in zip(papers, items):
            meta_items.append({"paper_id": p.id, **it})
        save_faiss_index(embeddings, meta_items)
    finally:
        db.close()
    return items


def load_faiss_index() -> Dict[str, Any]:
    try:
        import faiss
    except Exception:
        raise RuntimeError("faiss not installed")
    base = Path(__file__).parent / ".." / "ml"
    index_path = (base / "index.faiss").resolve()
    meta_path = (base / "index_meta.json").resolve()
    if not index_path.exists() or not meta_path.exists():
        return {"index": None, "meta": []}
    index = faiss.read_index(str(index_path))
    meta = json.loads(meta_path.read_text(encoding="utf8"))
    return {"index": index, "meta": meta}


def vector_search(query: str, top_k: int = 8) -> List[dict]:
    idx = load_faiss_index()
    if not idx.get("index"):
        return []
    emb = embed_texts([query])[0]
    import numpy as np
    arr = np.array([emb]).astype('float32')
    D, I = idx["index"].search(arr, top_k)
    results = []
    for dist, i in zip(D[0], I[0]):
        try:
            meta = idx["meta"][i]
        except Exception:
            meta = {}
        results.append({"score": float(dist), "meta": meta})
    return results


import os
from typing import List, Any
from pathlib import Path

try:
    from sentence_transformers import SentenceTransformer
    import faiss
except Exception:
    SentenceTransformer = None
    faiss = None

BASE = Path(__file__).parent
MODEL_NAME = os.environ.get("EMBED_MODEL", "all-MiniLM-L6-v2")


def _get_model():
    if SentenceTransformer is None:
        raise RuntimeError("sentence-transformers not installed")
    return SentenceTransformer(MODEL_NAME)


def embed_texts(texts: List[str]) -> List[List[float]]:
    model = _get_model()
    embeddings = model.encode(texts, show_progress_bar=False)
    return embeddings


def save_faiss_index(embeddings: List[Any], items: List[dict], out_path: str = None):
    if faiss is None:
        raise RuntimeError("faiss not installed")
    try:
        import numpy as np
        arr = np.array(embeddings).astype('float32')
    except Exception:
        # fallback: try to convert to list of lists
        arr = embeddings
    d = arr.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(arr)
    out = out_path or str(BASE / "index.faiss")
    faiss.write_index(index, out)
    # also save metadata
    import json
    # ensure metadata includes paper_id if available
    meta = []
    for i, it in enumerate(items):
        meta.append({
            "paper_id": it.get("paper_id"),
            "source_id": it.get("source_id"),
            "title": it.get("title"),
            "url": it.get("url"),
            "index_pos": i,
        })
    with open(BASE / "index_meta.json", "w", encoding="utf8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
    return out


def build_index_from_db(vectors: List[List[float]], metas: List[dict], out_path: str = None):
    """Builds a FAISS index from vectors list and stores metadata. Returns path."""
    if faiss is None:
        raise RuntimeError("faiss not installed")
    import numpy as np
    arr = np.array(vectors).astype('float32')
    d = arr.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(arr)
    out = out_path or str(BASE / "index.faiss")
    faiss.write_index(index, out)
    import json
    with open(BASE / "index_meta.json", "w", encoding="utf8") as f:
        json.dump(metas, f, ensure_ascii=False, indent=2)
    return out

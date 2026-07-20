from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db, engine
from .. import models, schemas
from ..services.research_service import (
    ingest_openalex,
    ingest_pubmed,
    ingest_europepmc,
    vector_search,
    ingest_europepmc,
)
from backend.workers.tasks import ingest_openalex_task, ingest_pubmed_task
from ..core.security import require_role, get_current_user

router = APIRouter()


@router.post("/ingest/openalex")
def ingest_openalex_endpoint(query: str = Query(..., min_length=1), background: bool = False, user=Depends(require_role("researcher"))):
    """If `background=true` the ingestion is enqueued as a Celery task. Otherwise runs synchronously."""
    if background:
        task = ingest_openalex_task.delay(query, per_page=5)
        return {"task_id": task.id}
    results = ingest_openalex(query)
    return {"ingested": len(results)}


@router.post("/ingest/pubmed")
def ingest_pubmed_endpoint(query: str = Query(..., min_length=1), background: bool = False, user=Depends(require_role("researcher"))):
    if background:
        task = ingest_pubmed_task.delay(query, retmax=5)
        return {"task_id": task.id}
    results = ingest_pubmed(query)
    return {"ingested": len(results)}


@router.post("/ingest/europepmc")
def ingest_europepmc_endpoint(query: str = Query(..., min_length=1), user=Depends(require_role("researcher"))):
    results = ingest_europepmc(query)
    return {"ingested": len(results)}


@router.get("/vector_search")
def vector_search_endpoint(q: str = Query(..., min_length=1), top_k: int = 8, user=Depends(get_current_user)):
    results = vector_search(q, top_k=top_k)
    return {"results": results}


@router.post("/embeddings/build")
def build_embeddings_index(user=Depends(require_role("researcher"))):
    """Rebuild FAISS index from stored embeddings in DB."""
    from ..database import SessionLocal
    from ..repositories.embeddings_repo import list_embeddings
    from ..ml.pipeline import build_index_from_db
    import json

    db = SessionLocal()
    try:
        rows = list_embeddings(db)
        if not rows:
            return {"status": "no_embeddings"}
        vectors = [json.loads(r.vector) for r in rows]
        metas = []
        for r in rows:
            metas.append({"paper_id": r.paper_id, "index_pos": r.index_pos})
        path = build_index_from_db(vectors, metas)
        return {"status": "ok", "path": path}
    finally:
        db.close()


@router.get("/search")
def search(q: str = Query(..., min_length=1)):
    # fallback simple OpenAlex search
    results = ingest_openalex(q, per_page=8)
    return {"results": results}

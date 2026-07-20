from sqlalchemy.orm import Session
from backend import models
import json
from typing import List


def create_embeddings(db: Session, papers: List[models.ResearchPaper], vectors: List[List[float]]):
    created = []
    for pos, (p, v) in enumerate(zip(papers, vectors)):
        vec_text = json.dumps(v)
        emb = models.Embedding(paper_id=p.id, vector=vec_text, index_pos=pos)
        db.add(emb)
        created.append(emb)
    db.commit()
    for e in created:
        db.refresh(e)
    return created


def list_embeddings(db: Session):
    return db.query(models.Embedding).order_by(models.Embedding.index_pos).all()

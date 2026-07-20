from typing import List, Dict
from sqlalchemy.orm import Session
from .. import models


def save_papers(db: Session, items: List[Dict]) -> int:
    created = 0
    saved_objs = []
    for it in items:
        # simple deduplication by source_id
        existing = db.query(models.ResearchPaper).filter(models.ResearchPaper.source_id == it.get("source_id")).first()
        if existing:
            saved_objs.append(existing)
            continue
        paper = models.ResearchPaper(
            source_id=it.get("source_id"),
            title=it.get("title"),
            abstract=it.get("abstract") or "",
            published_year=it.get("published_year") or None,
            url=it.get("url") or None,
        )
        db.add(paper)
        db.flush()
        saved_objs.append(paper)
        created += 1
    db.commit()
    # refresh saved objs
    for p in saved_objs:
        db.refresh(p)
    return saved_objs

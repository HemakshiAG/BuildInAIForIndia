from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..core.security import require_role, get_current_user

router = APIRouter()


@router.post("/api/evidence")
def add_evidence(item: schemas.EvidenceCreate, db: Session = Depends(get_db), user=Depends(require_role("researcher"))):
    paper = db.query(models.ResearchPaper).filter(models.ResearchPaper.id == item.paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    ev = models.Evidence(paper_id=item.paper_id, outcome=item.outcome, strength=item.strength)
    db.add(ev)
    db.commit()
    db.refresh(ev)
    return ev


@router.get("/api/evidence/{paper_id}")
def list_evidence(paper_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    items = db.query(models.Evidence).filter(models.Evidence.paper_id == paper_id).all()
    return items

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
from ..core.security import require_roles, get_current_user

router = APIRouter()


@router.post("/api/hospitals", response_model=schemas.HospitalOut)
def create_hospital(h: schemas.HospitalCreate, db: Session = Depends(get_db), user=Depends(require_roles("researcher", "admin"))):
    hospital = models.Hospital(name=h.name, country=h.country, meta=h.meta)
    db.add(hospital)
    db.commit()
    db.refresh(hospital)
    return hospital


@router.get("/api/hospitals", response_model=List[schemas.HospitalOut])
def list_hospitals(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.Hospital).all()


@router.get("/api/hospitals/{hospital_id}", response_model=schemas.HospitalOut)
def get_hospital(hospital_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    h = db.query(models.Hospital).filter(models.Hospital.id == hospital_id).first()
    if not h:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return h


@router.delete("/api/hospitals/{hospital_id}")
def delete_hospital(hospital_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin"))):
    h = db.query(models.Hospital).filter(models.Hospital.id == hospital_id).first()
    if not h:
        raise HTTPException(status_code=404, detail="Hospital not found")
    db.delete(h)
    db.commit()
    return {"deleted": hospital_id}

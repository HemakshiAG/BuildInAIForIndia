from pydantic import BaseModel, Field
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    email: str
    password: str
    role: Optional[str] = "researcher"


class UserRead(BaseModel):
    id: int
    email: str
    role: str

    model_config = {"from_attributes": True}


class ResearchPaperIn(BaseModel):
    source_id: str
    title: str
    abstract: Optional[str] = None
    published_year: Optional[int] = None
    url: Optional[str] = None


class ResearchPaperOut(ResearchPaperIn):
    id: int

    model_config = {"from_attributes": True}


class HospitalCreate(BaseModel):
    name: str
    country: Optional[str] = None
    meta: Optional[str] = None


class HospitalOut(BaseModel):
    id: int
    name: str
    country: Optional[str] = None
    meta: Optional[str] = None

    model_config = {"from_attributes": True}


class EvidenceCreate(BaseModel):
    paper_id: int
    outcome: str
    strength: float = 0.0

class EvidenceOut(EvidenceCreate):
    id: int

    model_config = {"from_attributes": True}

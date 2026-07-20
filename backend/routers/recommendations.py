from fastapi import APIRouter, Depends, HTTPException
from ..services.gap_engine import detect_gaps
from ..core.security import require_roles, get_current_user
from pydantic import BaseModel

router = APIRouter()


class HospitalProfileIn(BaseModel):
    id: str | None = None
    name: str
    country: str | None = None
    capabilities: str | None = None


@router.post("/api/recommendations")
def recommendations(profile: HospitalProfileIn, user=Depends(require_roles("hospital", "researcher"))):
    try:
        results = detect_gaps(profile.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # aggregate unique recommendations
    agg = {}
    for r in results:
        for rec in r.get("recommendations", []):
            agg[rec["action"]] = rec
    return {"recommendations": list(agg.values())}

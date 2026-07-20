from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from ..services.gap_engine import detect_gaps
from ..core.security import require_roles, get_current_user

router = APIRouter()


class HospitalProfile(BaseModel):
    id: str
    name: str
    country: str | None = None
    capabilities: str | None = None


@router.post("/detect")
def detect(profile: HospitalProfile, user=Depends(require_roles("hospital", "researcher"))):
    try:
        results = detect_gaps(profile.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # include summary recommendations (aggregated)
    agg_recs = []
    seen = set()
    for r in results:
        for rec in r.get("recommendations", []):
            if rec["action"] not in seen:
                seen.add(rec["action"])
                agg_recs.append(rec)
    return {"gaps": results, "recommendations": agg_recs}

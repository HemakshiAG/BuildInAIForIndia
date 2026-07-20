from fastapi import APIRouter, Depends, Response, HTTPException
from ..services.gap_engine import detect_gaps
from ..core.security import require_roles, get_current_user
from typing import Optional

router = APIRouter()


@router.get("/api/reports/hospital/{hospital_id}/gaps.csv")
def hospital_gaps_csv(hospital_id: int, name: Optional[str] = None, country: Optional[str] = None, user=Depends(require_roles("researcher", "hospital"))):
    profile = {"id": str(hospital_id), "name": name or f"hospital-{hospital_id}", "country": country}
    try:
        results = detect_gaps(profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # produce CSV: gap_id, title, gap_score, recommendation_actions (semicolon)
    lines = ["gap_id,title,gap_score,recommendations"]
    for i, g in enumerate(results):
        recs = "; ".join([r.get("action", "") for r in g.get("recommendations", [])])
        title = g.get("title", g.get("gap", ""))
        score = g.get("gap_score", "")
        # escape commas
        title = title.replace(",", " ")
        lines.append(f"{i+1},{title},{score},{recs}")
    csv_text = "\n".join(lines)
    return Response(content=csv_text, media_type="text/csv")

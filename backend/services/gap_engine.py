from typing import List, Dict, Any
from .research_service import load_faiss_index
from ..ml.pipeline import embed_texts


def _score_gap(similarity: float, citation_boost: float = 1.0) -> float:
    # higher similarity -> lower gap; invert
    return float((1.0 - similarity) * citation_boost)


def _estimate_feasibility(hospital_text: str, evidence_text: str) -> float:
    """Heuristic feasibility: favors evidence mentioning low-resource, pilot, or implementation, and hospitals mentioning capabilities."""
    hosp = hospital_text.lower() if hospital_text else ""
    ev = evidence_text.lower() if evidence_text else ""
    score = 0.5
    # hospital readiness signals
    if any(k in hosp for k in ["trained staff", "icu", "operating", "surgery", "specialist", "telemedicine"]):
        score += 0.2
    if len(hosp.split()) > 30:
        score += 0.1
    # evidence indicates implementability
    if any(k in ev for k in ["implementation", "pilot", "low-resource", "feasible", "trial", "cluster randomized"]):
        score += 0.2
    # penalize evidence requiring high resources
    if any(k in ev for k in ["high-resource", "tertiary", "advanced imaging", "specialized surgery"]):
        score -= 0.2
    return max(0.0, min(1.0, score))


def _estimate_confidence(meta: Dict[str, Any], similarity: float) -> float:
    """Estimate confidence using citation counts and similarity.

    Falls back to similarity-based confidence when citation counts absent.
    """
    citations = meta.get("cited_by_count") or meta.get("citation_count") or meta.get("citations") or 0
    try:
        citations = int(citations)
    except Exception:
        citations = 0
    cit_score = min(1.0, citations / 100.0)
    sim_score = similarity
    conf = 0.4 * cit_score + 0.6 * sim_score
    return max(0.0, min(1.0, conf))


def _evidence_quality(meta: Dict[str, Any]) -> float:
    """Estimate evidence quality from citations and source type."""
    citations = meta.get("cited_by_count") or meta.get("citation_count") or meta.get("citations") or 0
    try:
        citations = int(citations)
    except Exception:
        citations = 0
    venue = (meta.get("journal") or meta.get("source_title") or "").lower()
    score = min(1.0, citations / 200.0)
    # small boost for well-known high-tier journal words
    if any(k in venue for k in ["lancet", "nature", "nejm", "jama", "bmj"]):
        score = min(1.0, score + 0.15)
    return score


def _detect_barriers(evidence_text: str) -> Dict[str, float]:
    """Return detected barrier probabilities for resource, staffing, policy, or regulatory issues."""
    t = (evidence_text or "").lower()
    barriers = {
        "resource": 0.0,
        "staffing": 0.0,
        "policy": 0.0,
        "regulatory": 0.0,
    }
    if any(k in t for k in ["advanced imaging", "ct", "mri", "hemodialysis", "specialized surgery", "high-resource"]):
        barriers["resource"] = 0.9
    if any(k in t for k in ["trained staff", "specialist", "surgeon", "cardiologist", "anesthesiologist"]):
        barriers["staffing"] = 0.8
    if any(k in t for k in ["policy", "guideline", "regulation", "consent"]):
        barriers["policy"] = 0.6
    if any(k in t for k in ["trial", "ethics", "regulatory", "approval"]):
        barriers["regulatory"] = max(barriers["regulatory"], 0.6)
    return barriers


def _recommend_actions(feasibility: float, confidence: float, barriers: Dict[str, float]) -> List[Dict[str, Any]]:
    recs: List[Dict[str, Any]] = []
    # If feasibility high and confidence high -> recommend pilot + scale
    if feasibility >= 0.6 and confidence >= 0.6:
        recs.append({"action": "pilot_project", "reason": "Feasible locally and supported by confident evidence"})
        recs.append({"action": "training", "reason": "Build staff capacity for implementation"})
    else:
        # recommend demonstration/pilot with technical assistance
        recs.append({"action": "demonstration", "reason": "Requires local adaptation or further evaluation"})
    # resource-heavy barrier
    if barriers.get("resource", 0) > 0.5:
        recs.append({"action": "equipment_investment", "reason": "Evidence requires specialized equipment"})
    if barriers.get("staffing", 0) > 0.5:
        recs.append({"action": "training_program", "reason": "Staffing gaps detected"})
    if barriers.get("policy", 0) > 0.5:
        recs.append({"action": "policy_review", "reason": "Policy or guideline changes may be needed"})
    if barriers.get("regulatory", 0) > 0.5:
        recs.append({"action": "regulatory_pathway", "reason": "Regulatory approvals may be required"})
    # dedupe actions preserving order
    seen = set()
    out = []
    for r in recs:
        if r["action"] not in seen:
            seen.add(r["action"])
            out.append(r)
    return out


def _estimate_novelty(meta: Dict[str, Any], similarity: float) -> float:
    """Novelty: newer publications and lower similarity => higher novelty."""
    year = meta.get("published_year") or meta.get("year") or 0
    try:
        year = int(year)
    except Exception:
        year = 0
    recency = 0.5
    if year:
        recency = max(0.0, min(1.0, (year - 2000) / (2026 - 2000)))
    novelty = (1.0 - similarity) * 0.6 + recency * 0.4
    return max(0.0, min(1.0, novelty))


def detect_gaps(hospital_profile: Dict[str, Any], top_k: int = 5) -> List[Dict[str, Any]]:
    """Detect implementation gaps by comparing hospital needs to research evidence.

    hospital_profile: {"id": str, "name": str, "capabilities": str}
    Returns a list of gap candidates with enhanced scoring: gap_score, feasibility, confidence, novelty, expected_impact.
    """
    idx = load_faiss_index()
    if not idx.get("index"):
        return []
    # embed hospital capabilities
    text = hospital_profile.get("capabilities", "") or hospital_profile.get("description", "") or ""
    emb = embed_texts([text])[0]
    # numpy is optional for tests; if available, use it, else pass raw list
    try:
        import numpy as np
        arr = np.array([emb]).astype("float32")
    except Exception:
        arr = [emb]
    D, I = idx["index"].search(arr, top_k)
    results = []
    for dist, i in zip(D[0], I[0]):
        meta = idx["meta"][i] if i < len(idx["meta"]) else {}
        # transform L2 distance to cosine-like similarity if needed
        sim = 1.0 / (1.0 + float(dist))
        gap_score = _score_gap(sim)
        evidence_text = (meta.get("title") or "") + " " + (meta.get("abstract") or "")
        feasibility = _estimate_feasibility(text, evidence_text)
        confidence = _estimate_confidence(meta, sim)
        quality = _evidence_quality(meta)
        novelty = _estimate_novelty(meta, sim)
        barriers = _detect_barriers(evidence_text)
        expected_impact = gap_score * (0.5 + feasibility * 0.5) * (1.0 + novelty)
        recommendations = _recommend_actions(feasibility, confidence, barriers)
        explanation = {
            "quality": quality,
            "confidence_components": {"similarity": sim, "citations": meta.get("cited_by_count") or meta.get("citation_count")},
            "barriers": barriers,
        }
        results.append(
            {
                "evidence": meta,
                "distance": float(dist),
                "similarity": sim,
                "gap_score": gap_score,
                "feasibility": feasibility,
                "confidence": confidence,
                "quality": quality,
                "novelty": novelty,
                "expected_impact": expected_impact,
                "barriers": barriers,
                "recommendations": recommendations,
                "explanation": explanation,
            }
        )

    # rank by expected_impact descending
    results = sorted(results, key=lambda x: x["expected_impact"], reverse=True)
    return results

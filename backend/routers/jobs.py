from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from backend.database import get_db
from sqlalchemy.orm import Session
from backend.repositories.ingestion_jobs_repo import list_jobs, get_job

router = APIRouter()


@router.get("/api/jobs")
def list_ingestion_jobs(
    limit: int = Query(50, ge=1, le=200),
    offset: int = 0,
    status: str | None = Query(None),
    task_type: str | None = Query(None),
    since: str | None = Query(None),
    until: str | None = Query(None),
    db: Session = Depends(get_db),
):
    jobs = list_jobs(db, limit=limit, offset=offset, status=status, task_type=task_type, since=since, until=until)
    out = []
    for j in jobs:
        out.append({
            "task_id": j.task_id,
            "task_type": j.task_type,
            "status": j.status,
            "started_at": j.started_at,
            "finished_at": j.finished_at,
            "result_summary": j.result_summary,
            "logs": j.logs,
            "created_at": j.created_at,
        })
    return out


@router.get("/api/jobs/{task_id}")
def get_ingestion_job(task_id: str, db: Session = Depends(get_db)):
    job = get_job(db, task_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {
        "task_id": job.task_id,
        "task_type": job.task_type,
        "status": job.status,
        "started_at": job.started_at,
        "finished_at": job.finished_at,
        "result_summary": job.result_summary,
        "logs": job.logs,
        "created_at": job.created_at,
    }

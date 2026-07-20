from sqlalchemy.orm import Session
from backend import models
from datetime import datetime


def create_job(db: Session, task_id: str, task_type: str, status: str = "PENDING") -> models.IngestionJob:
    job = models.IngestionJob(task_id=task_id, task_type=task_type, status=status, started_at=None)
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def update_job(db: Session, task_id: str, *, status: str = None, result_summary: str = None, logs: str = None, finished: bool = False):
    job = db.query(models.IngestionJob).filter(models.IngestionJob.task_id == task_id).first()
    if not job:
        return None
    if status:
        job.status = status
        if status == "STARTED":
            job.started_at = datetime.utcnow()
    if result_summary is not None:
        job.result_summary = result_summary
    if logs is not None:
        job.logs = logs
    if finished:
        job.finished_at = datetime.utcnow()
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def list_jobs(db: Session, limit: int = 50, offset: int = 0, status: str = None, task_type: str = None, since: str = None, until: str = None):
    q = db.query(models.IngestionJob)
    if status:
        q = q.filter(models.IngestionJob.status == status)
    if task_type:
        q = q.filter(models.IngestionJob.task_type == task_type)
    # optional ISO datetime strings for since/until
    from dateutil import parser
    if since:
        try:
            dt = parser.isoparse(since)
            q = q.filter(models.IngestionJob.created_at >= dt)
        except Exception:
            pass
    if until:
        try:
            dt = parser.isoparse(until)
            q = q.filter(models.IngestionJob.created_at <= dt)
        except Exception:
            pass
    return q.order_by(models.IngestionJob.created_at.desc()).offset(offset).limit(limit).all()


def get_job(db: Session, task_id: str):
    return db.query(models.IngestionJob).filter(models.IngestionJob.task_id == task_id).first()

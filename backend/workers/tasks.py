from backend.core.celery_app import celery_app
from backend.services import research_service
from celery import current_task
from backend.database import SessionLocal
from backend.repositories.ingestion_jobs_repo import create_job, update_job
import json
import traceback


@celery_app.task(name="backend.workers.tasks.ingest_openalex")
def ingest_openalex_task(query: str, per_page: int = 5):
    """Background task to ingest OpenAlex results and index embeddings."""
    db = SessionLocal()
    task_id = None
    try:
        task_id = current_task.request.id if current_task and current_task.request else None
        if task_id:
            create_job(db, task_id=task_id, task_type="openalex", status="PENDING")
            update_job(db, task_id=task_id, status="STARTED")
        result = research_service.ingest_openalex(query, per_page=per_page)
        summary = {"inserted": len(result) if hasattr(result, "__len__") else 0}
        if task_id:
            update_job(db, task_id=task_id, status="SUCCESS", result_summary=json.dumps(summary), finished=True)
        return result
    except Exception:
        tb = traceback.format_exc()
        if task_id:
            update_job(db, task_id=task_id, status="FAILURE", logs=tb, finished=True)
        raise
    finally:
        db.close()


@celery_app.task(name="backend.workers.tasks.ingest_pubmed")
def ingest_pubmed_task(query: str, retmax: int = 5):
    db = SessionLocal()
    task_id = None
    try:
        task_id = current_task.request.id if current_task and current_task.request else None
        if task_id:
            create_job(db, task_id=task_id, task_type="pubmed", status="PENDING")
            update_job(db, task_id=task_id, status="STARTED")
        result = research_service.ingest_pubmed(query, retmax=retmax)
        summary = {"inserted": len(result) if hasattr(result, "__len__") else 0}
        if task_id:
            update_job(db, task_id=task_id, status="SUCCESS", result_summary=json.dumps(summary), finished=True)
        return result
    except Exception:
        tb = traceback.format_exc()
        if task_id:
            update_job(db, task_id=task_id, status="FAILURE", logs=tb, finished=True)
        raise
    finally:
        db.close()

from fastapi import APIRouter, HTTPException
from backend.core.celery_app import celery_app

router = APIRouter()


@router.get("/{task_id}")
def get_task(task_id: str):
    try:
        res = celery_app.AsyncResult(task_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"id": task_id, "status": res.status, "result": res.result}

import os
from celery import Celery

BROKER = os.environ.get("CELERY_BROKER_URL", "redis://redis:6379/0")
BACKEND = os.environ.get("CELERY_RESULT_BACKEND", "redis://redis:6379/1")

celery_app = Celery("bridgecare", broker=BROKER, backend=BACKEND)
celery_app.conf.update(
    task_routes={
        "backend.workers.tasks.*": {"queue": "ingest"},
    },
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
)

# import tasks so they register when celery starts
try:
    import backend.workers.tasks  # noqa: F401
except Exception:
    pass

# simple beat schedule for periodic ingestion (configurable via env)
celery_app.conf.beat_schedule = {
    "scheduled-openalex-ingest": {
        "task": "backend.workers.tasks.ingest_openalex",
        "schedule": 3600.0,  # every hour
        "args": ("implementation science", 3),
    }
}

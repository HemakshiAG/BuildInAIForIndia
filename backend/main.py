
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, research, graph
from .core.config import settings
from .health import health as _health

app = FastAPI(title="BridgeCare AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(research.router, prefix="/api/research", tags=["research"])
app.include_router(graph.router, prefix="/api/graph", tags=["graph"])
from .routers import gap

app.include_router(gap.router, prefix="/api/gap", tags=["gap"])
from .routers import tasks
from .routers import jobs
from .routers import hospitals, evidence
from .routers import recommendations, reports
from .routers import chat

app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(jobs.router)
app.include_router(hospitals.router)
app.include_router(evidence.router)
app.include_router(recommendations.router)
app.include_router(reports.router)
app.include_router(chat.router)


@app.get("/healthz")
def health():
    return _health()

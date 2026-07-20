Param([
    switch]$SkipDocker
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
# repo root is parent of scripts directory
$repoRoot = Resolve-Path (Join-Path $scriptDir "..")
Set-Location $repoRoot

Write-Host "Applying fixes to backend/database.py and backend/Dockerfile..."

$dbContent = @"
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .core.config import settings

database_url = settings.DATABASE_URL
# Apply SQLite-specific connect_args only when using SQLite
if database_url.startswith("sqlite"):
    engine = create_engine(database_url, connect_args={"check_same_thread": False})
else:
    engine = create_engine(database_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
"@

Write-Host "Writing backend/database.py"
Set-Content -Path .\backend\database.py -Value $dbContent -Encoding UTF8 -Force

$dockerfileContent = @"
FROM python:3.11-slim
WORKDIR /app

# Install system build deps required by some ML packages (faiss, numpy wheels, etc.)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        gcc \
        g++ \
        libopenblas-dev \
        libgomp1 \
        libatlas-base-dev && \
    rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt
COPY . /app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
"@

Write-Host "Writing backend/Dockerfile"
Set-Content -Path .\backend\Dockerfile -Value $dockerfileContent -Encoding UTF8 -Force

if (Get-Command git -ErrorAction SilentlyContinue) {
    try {
        git add backend/database.py backend/Dockerfile
        git commit -m "fix: conditional sqlite connect_args; chore(docker): add ML build deps" -q
        Write-Host "Committed changes to git." -ForegroundColor Green
    } catch {
        Write-Host "No changes committed (maybe already applied) or git commit failed." -ForegroundColor Yellow
    }
} else {
    Write-Host "git not found; files written but not committed." -ForegroundColor Yellow
}

if (-not $SkipDocker) {
    if (Get-Command docker -ErrorAction SilentlyContinue) {
        Write-Host "Running: docker compose up --build"
        docker compose up --build
    } else {
        Write-Host "Docker not found on this machine. Install Docker Desktop or Docker Engine and re-run the script with -SkipDocker to only apply patches." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "SkipDocker specified - patches applied, no docker commands run." -ForegroundColor Cyan
}

Write-Host "Done."

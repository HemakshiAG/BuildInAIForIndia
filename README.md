# BridgeCare AI

BridgeCare AI is a full-stack healthcare research translation platform that connects medical evidence, clinical adoption, and implementation intelligence through AI-powered semantic search, knowledge graph exploration, gap detection, and an interactive assistant.

---

## 🌐 Live Demo

| Resource | Link |
|----------|------|
| 🚀 Frontend | **https://build-in-ai-for-india.vercel.app/** |
| ⚙️ Backend API | **https://buildinaiforindia.onrender.com/** |
| 🎥 Demo Video | **https://youtu.be/mJa6C1IUOUQ** |


## Problem Statement

Healthcare research often fails to reach clinical practice quickly enough. BridgeCare AI addresses this gap by:

- ingesting and indexing medical research from public sources
- embedding evidence for semantic search
- detecting implementation gaps for hospitals
- providing evidence-backed recommendations
- enabling an AI assistant for research translation

This project is designed to help teams move from medical research to real healthcare impact faster.

---

## Architecture

### Backend
- `FastAPI` backend
- PostgreSQL for persistent data
- Redis + Celery for background ingestion tasks
- SentenceTransformers embeddings
- FAISS vector index for semantic search
- JWT-based auth with token protection
- Local graph persistence using `networkx` and JSON

### Frontend
- `Next.js` app
- Client-side auth using login/register forms
- Pages for dashboard, research, gap detection, knowledge graph, hospitals, evidence, chat, reports, and tasks
- API client in `frontend/lib/api.ts`

### Deployment
- Docker Compose orchestrates:
  - `db` (Postgres)
  - `redis`
  - `backend`
  - `worker`
  - `beat`
  - `frontend`

---

## Tech Stack

- Python 3
- FastAPI
- SQLAlchemy
- PostgreSQL
- Redis
- Celery
- SentenceTransformers
- FAISS
- OpenAI (optional, via `OPENAI_API_KEY`)
- Next.js / React / TypeScript
- Tailwind CSS
- Docker / Docker Compose

---

## Key Functionality

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/token`
- JWT auth via bearer token
- Password hashing with `passlib` using `pbkdf2_sha256` and legacy `bcrypt_sha256` fallback

### Research Ingestion
- `POST /api/research/ingest/openalex`
- `POST /api/research/ingest/pubmed`
- `POST /api/research/ingest/europepmc`
- Saves research papers, builds embeddings, and stores metadata

### Vector Search & Embeddings
- `GET /api/research/vector_search?q=...`
- `POST /api/research/embeddings/build`
- Searches over FAISS index loaded from `backend/ml/index.faiss`
- Also supports fallback research search via OpenAlex

### Gap Detection
- `POST /api/gap/detect`
- Uses hospital profile input plus vector similarity and heuristics
- Generates gap scores, feasibility, confidence, novelty, and recommendations

### Knowledge Graph
- `POST /api/graph/entity`
- `POST /api/graph/relation`
- `GET /api/graph/entity/{entity_id}/neighbors`
- `GET /api/graph/export`
- Stores graph nodes/edges in `backend/data/graph.json`

### Hospitals & Evidence
- CRUD hospital endpoints
- Evidence submission tied to research papers
- Real database-backed hospital and evidence data

### AI Assistant
- `POST /api/chat`
- Runs RAG:
  - vector search over saved research
  - builds context
  - calls OpenAI if configured
- Frontend chat page uses backend chat API

---

## What Works Live

The backend supports:
- registration and login
- hospital creation and listing
- evidence storage and retrieval
- knowledge graph creation and exploration
- research ingestion from OpenAlex / Europe PMC / PubMed
- embedding and FAISS-based search
- gap detection based on real stored research
- chat assistant using RAG and OpenAI fallback

---

## What Requires Setup

To get the full ML/live experience, you should:
- ingest research data using the `/api/research/ingest/...` endpoints
- build the FAISS index with `/api/research/embeddings/build`
- set `OPENAI_API_KEY` for real assistant responses
- ensure the backend has network access to external research APIs

---

## Running Locally

### Docker (recommended)
```bash
docker compose up --build

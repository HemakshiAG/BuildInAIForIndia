import importlib, sys
from pathlib import Path
repo_root = Path(__file__).resolve().parents[2]
if str(repo_root) not in sys.path:
    sys.path.insert(0, str(repo_root))

import os
import json
from backend.database import SessionLocal, engine
from backend import models
from backend.repositories.research_repo import save_papers
from backend.repositories.embeddings_repo import create_embeddings, list_embeddings


def setup_module(module):
    # ensure tables exist
    models.Base.metadata.create_all(bind=engine)


def test_embedding_persistence_and_listing(tmp_path):
    db = SessionLocal()
    try:
        # clear tables for test isolation
        db.query(models.Embedding).delete()
        db.query(models.ResearchPaper).delete()
        db.commit()

        items = [
            {"source_id": "s1", "title": "T1", "abstract": "A1", "url": "http://1"},
            {"source_id": "s2", "title": "T2", "abstract": "A2", "url": "http://2"},
        ]
        papers = save_papers(db, items)
        assert len(papers) == 2

        vectors = [[0.1, 0.2, 0.3], [0.2, 0.1, 0.4]]
        created = create_embeddings(db, papers, vectors)
        assert len(created) == 2

        rows = list_embeddings(db)
        assert len(rows) >= 2
        # ensure vector JSON stored
        for r, v in zip(rows[:2], vectors):
            assert json.loads(r.vector) == v
    finally:
        db.close()


def test_build_index_from_db_creates_files(monkeypatch, tmp_path):
    # Mock faiss to avoid heavy dependency
    import backend.ml.pipeline as pipeline
    class DummyIndex:
        def __init__(self, d):
            self.d = d
        def add(self, arr):
            pass

    class DummyFaissModule:
        def IndexFlatL2(self, d):
            return DummyIndex(d)
        def write_index(self, index, out):
            # create an empty file to simulate write
            open(out, "wb").close()

    monkeypatch.setattr(pipeline, "faiss", DummyFaissModule())

    # Mock numpy to avoid requiring numpy package
    class DummyArr:
        def __init__(self, v):
            self._v = v
            self.shape = (len(v), len(v[0]) if v and len(v) and len(v[0]) else 0)
        def astype(self, t):
            return self

    class DummyNP:
        def array(self, v):
            return DummyArr(v)

    import sys
    monkeypatch.setitem(sys.modules, "numpy", DummyNP())

    vectors = [[0.1, 0.2, 0.3], [0.2, 0.1, 0.4]]
    metas = [{"paper_id": 1, "index_pos": 0}, {"paper_id": 2, "index_pos": 1}]
    out = pipeline.build_index_from_db(vectors, metas, out_path=str(tmp_path / "idx.faiss"))
    assert os.path.exists(out)
    meta_path = pipeline.BASE / "index_meta.json"
    assert meta_path.exists()
    data = json.loads(meta_path.read_text(encoding="utf8"))
    assert isinstance(data, list)
    # cleanup
    try:
        os.remove(out)
    except Exception:
        pass
    try:
        meta_path.unlink()
    except Exception:
        pass

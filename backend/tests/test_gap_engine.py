import importlib.util
from pathlib import Path
import types


def _make_fake_index(meta_list):
    class FakeIndex:
        def __init__(self, meta):
            self._meta = meta

        def search(self, arr, top_k):
            # return distances and indices as plain Python lists
            n = min(top_k, len(self._meta))
            D = [list(range(1, n + 1))]
            I = [list(range(0, n))]
            return D, I

    return FakeIndex(meta_list)


def test_detect_gaps(monkeypatch):
    # import module as package to allow relative imports
    import importlib, sys
    repo_root = Path(__file__).resolve().parents[2]
    if str(repo_root) not in sys.path:
        sys.path.insert(0, str(repo_root))
    mod = importlib.import_module("backend.services.gap_engine")

    # create fake meta entries
    meta = [
        {"source_id": "a1", "title": "Low-resource implementation of X", "abstract": "Pilot study", "published_year": 2022, "cited_by_count": 5},
        {"source_id": "a2", "title": "High-resource advanced imaging", "abstract": "Requires tertiary care", "published_year": 2018, "cited_by_count": 20},
    ]

    fake_idx = {"index": _make_fake_index(meta), "meta": meta}

    monkeypatch.setattr(mod, "load_faiss_index", lambda: fake_idx)
    monkeypatch.setattr(mod, "embed_texts", lambda texts: [[0.1] * 384 for _ in texts])

    profile = {"id": "h1", "name": "Test Hospital", "capabilities": "trained staff and basic ICU, telemedicine"}
    results = mod.detect_gaps(profile, top_k=2)
    assert isinstance(results, list)
    assert len(results) == 2
    for r in results:
        assert "gap_score" in r
        assert "feasibility" in r
        assert "confidence" in r
        assert "novelty" in r
        assert "expected_impact" in r

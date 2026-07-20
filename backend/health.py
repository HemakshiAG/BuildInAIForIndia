def health():
    """Lightweight health function usable in tests without importing FastAPI."""
    return {"status": "ok"}

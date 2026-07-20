import importlib


def test_chat_service_imports():
    module = importlib.import_module("backend.services.chat_service")
    assert hasattr(module, "rag_answer")

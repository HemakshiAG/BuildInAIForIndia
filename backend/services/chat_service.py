from typing import List, Optional
from backend.services.research_service import vector_search
from backend.database import SessionLocal
import os

try:
    import openai
except Exception:
    openai = None


def build_context_from_hits(hits: List[dict], max_chars: int = 2000) -> str:
    parts = []
    total = 0
    for h in hits:
        text = h.get("abstract") or h.get("title") or ""
        if not text:
            continue
        if total + len(text) > max_chars:
            break
        parts.append(f"- {h.get('title','')}: {text}")
        total += len(text)
    return "\n".join(parts)


def answer_with_llm(prompt: str, context: str, model: str = "gpt-3.5-turbo") -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not openai or not api_key:
        # fallback: simple heuristic answer when OpenAI is unavailable
        return (
            "OpenAI integration is not configured. "
            "I retrieved the following context and can only provide a fallback answer from it:\n\n"
            f"Context:\n{context}\n\nQuestion:\n{prompt}"
        )
    openai.api_key = api_key
    messages = [
        {"role": "system", "content": "You are a helpful medical AI assistant that cites evidence."},
        {"role": "user", "content": f"Context:\n{context}\n\nQuestion:\n{prompt}"},
    ]
    resp = openai.ChatCompletion.create(model=model, messages=messages, temperature=0.0)
    return resp.choices[0].message.content


def rag_answer(query: str, top_k: int = 5) -> dict:
    # run vector search to get relevant papers
    hits = vector_search(query, top_k=top_k)
    # build context
    context = build_context_from_hits(hits)
    # call LLM (or fallback)
    answer = answer_with_llm(query, context)
    return {"answer": answer, "context": context, "hits": hits}

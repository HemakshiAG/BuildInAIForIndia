from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from ..services.chat_service import rag_answer
from ..core.security import get_current_user

router = APIRouter()


class ChatQuery(BaseModel):
    q: str
    top_k: int | None = 5


@router.post("/api/chat")
def chat(query: ChatQuery, user=Depends(get_current_user)):
    if not query.q:
        raise HTTPException(status_code=400, detail="Missing query")
    res = rag_answer(query.q, top_k=query.top_k or 5)
    return res

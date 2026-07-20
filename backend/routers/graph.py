from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from ..graph.graph_service import add_entity, add_relation, neighbors, export_graph
from ..core.security import require_role, get_current_user

router = APIRouter()


class EntityIn(BaseModel):
    id: str
    type: str
    props: dict | None = None


class RelationIn(BaseModel):
    source: str
    target: str
    relation: str
    props: dict | None = None


@router.post("/entity")
def create_entity(payload: EntityIn, user=Depends(require_role("researcher"))):
    try:
        res = add_entity(payload.id, payload.type, payload.props)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return res


@router.post("/relation")
def create_relation(payload: RelationIn, user=Depends(require_role("researcher"))):
    try:
        res = add_relation(payload.source, payload.target, payload.relation, payload.props)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return res


@router.get("/entity/{entity_id}/neighbors")
def get_neighbors(entity_id: str, depth: int = 1, user=Depends(get_current_user)):
    res = neighbors(entity_id, depth=depth)
    return res


@router.get("/export")
def get_export(user=Depends(get_current_user)):
    return export_graph()


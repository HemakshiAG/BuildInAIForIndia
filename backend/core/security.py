from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from .config import settings
from ..database import get_db
from sqlalchemy.orm import Session
from .. import models

security = HTTPBearer()


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return payload


def get_current_user(payload: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    try:
        user_id = int(user_id)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def require_role(role: str):
    def role_dependency(user = Depends(get_current_user)):
        if user.role != role and user.role != "admin":
            raise HTTPException(status_code=403, detail="Insufficient role")
        return user
    return role_dependency


def require_roles(*roles: str):
    def role_dependency(user = Depends(get_current_user)):
        if user.role not in roles and user.role != "admin":
            raise HTTPException(status_code=403, detail="Insufficient role")
        return user
    return role_dependency

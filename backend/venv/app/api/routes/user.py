from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.user import create_user, get_users
from schemas.user import UserCreate, UserResponse

router = APIRouter()

# dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users", response_model=UserResponse)
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user.name)

@router.get("/users", response_model=list[UserResponse])
def read_users(db: Session = Depends(get_db)):
    return get_users(db)
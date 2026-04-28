from sqlalchemy.orm import Session
from models.user import User

def create_user(db: Session, name: str):
    new_user = User(name=name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_users(db: Session):
    return db.query(User).all()

def get_user(db: Session, id: int):
    return db.get(User, id)
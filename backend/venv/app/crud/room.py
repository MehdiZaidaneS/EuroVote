import random
import string

from sqlalchemy.orm import Session
from models.room import Room


def create_room(db: Session, name: str):
    code = ''.join(random.choices(string.ascii_uppercase, k=10))
    new_room = Room(name=name, code= code)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room


def get_all_rooms(db: Session):
    return db.query(Room).all()


def get_room(db: Session, code: str):

    return db.query(Room).filter(Room.code == code).first()
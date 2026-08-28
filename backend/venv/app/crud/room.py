import random
import string

from sqlalchemy.orm import Session
from models.room import Room
from models.user import User


def create_room(db: Session, year: int):
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=10))

        existing_room = db.query(Room).filter(Room.code == code).first()

        if not existing_room:
            break

    new_room = Room(year=year, code=code)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)

    return new_room


def join_room(db: Session, code: str, user_id: int):
    room = db.query(Room).filter(Room.code == code).first()
    user = db.get(User, user_id)

    if room is None:
        return None

    if user is None:
        return None

    if user in room.players:
        return room

    room.players.append(user)

    db.commit()
    db.refresh(room)

    return room


def get_all_rooms(db: Session):
    return db.query(Room).all()


def get_room(db: Session, code: str):

    return db.query(Room).filter(Room.code == code).first()
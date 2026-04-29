from sqlalchemy.orm import Session
from models.room import Room


def create_room(db: Session, name: str, creator_id: int):
    code = "XRHD"
    new_room = Room(name=name, creator_id=creator_id, code= code)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room


def get_all_rooms(db: Session):
    return db.query(Room).all()


def get_room(db: Session, id: int):
    return db.get(Room, id)
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.room import create_room, get_room
from schemas.room import RoomCreate, RoomResponse

router = APIRouter(prefix="/rooms", tags=["Rooms"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=RoomResponse)
def create_room_endpoint(room: RoomCreate, db: Session = Depends(get_db)):
    return create_room(db, room.name, room.creator_id)


@router.get("/{room_id}", response_model=RoomResponse)
def get_room_with_id(room_id: int,db:Session = Depends(get_db)):
    return get_room(db, room_id)
    


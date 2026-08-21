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
    return create_room(db, room.name)


@router.get("/{room_code}", response_model=RoomResponse)
def get_room_with_id(room_code: str ,db:Session = Depends(get_db)):
    return get_room(db, room_code)
    


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.room import create_room, get_room, join_room, get_all_rooms
from schemas.room import RoomCreate, RoomResponse, JoinRoomCreate


router = APIRouter(prefix="/rooms", tags=["Rooms"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=RoomResponse)
def create_room_endpoint(room: RoomCreate, db: Session = Depends(get_db)):
    return create_room(db, room.year)

@router.post("/{room_code}", response_model=RoomResponse)
def user_join_room(
    user: JoinRoomCreate,
    room_code: str,
    db: Session = Depends(get_db)
):
    return join_room(db, room_code, user.player_id)
    

@router.get("/{room_code}", response_model=RoomResponse)
def get_room_with_id(room_code: str ,db:Session = Depends(get_db)):
    return get_room(db, room_code)


@router.get("/", response_model=list[RoomResponse])
def retrieve_all_rooms(db:Session = Depends(get_db)):
    return get_all_rooms(db)


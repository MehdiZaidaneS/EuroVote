from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.room import (
    create_room,
    get_room,
    join_room,
    get_all_rooms,
    get_room_code
)
from schemas.room import RoomCreate, RoomResponse, JoinRoomCreate


router = APIRouter(prefix="/rooms", tags=["Rooms"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=RoomResponse)
def create_room_endpoint(
    room: RoomCreate,
    db: Session = Depends(get_db)
):
    return create_room(db, room.year)


@router.post("/{room_id}", response_model=RoomResponse)
def user_join_room(
    user: JoinRoomCreate,
    room_id: str,
    db: Session = Depends(get_db)
):
    room = join_room(db, room_id, user.player_id)

    if room is None:
        raise HTTPException(
            status_code=404,
            detail="Room or player not found, or player already joined"
        )

    return room


@router.get("/code/{room_code}", response_model=RoomResponse)
def get_room_with_code(
    room_code: str,
    db: Session = Depends(get_db)
):
    room = get_room_code(db, room_code)

    if room is None:
        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    return room


@router.get("/{room_id}", response_model=RoomResponse)
def get_room_with_id(
    room_id: str,
    db: Session = Depends(get_db)
):
    room = get_room(db, room_id)

    if room is None:
        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    return room


@router.get("/", response_model=list[RoomResponse])
def retrieve_all_rooms(db: Session = Depends(get_db)):
    return get_all_rooms(db)
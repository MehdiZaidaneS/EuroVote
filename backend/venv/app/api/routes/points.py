from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.points import (
    give_points,
    get_all_points_from_user,
    get_point_from_country,
    update_points,
    give_position
)
from schemas.points import PointsCreate, PointsResponse, PositionCreate

router = APIRouter(prefix="/points", tags=["Points"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{room_id}/{player_id}/{country_id}", response_model=PointsResponse)
def create_points(
    points: PointsCreate,
    room_id: str,
    country_id: int,
    player_id: str,
    db: Session = Depends(get_db)
):
    result = give_points(db, country_id, points.points, player_id, room_id)

    if result is None:
        raise HTTPException(status_code=404, detail="Room or player not found, or player is not in room")

    return result


@router.patch("/{room_id}/{player_id}/{country_id}", response_model=PointsResponse)
def update_points_country(
    points: PointsCreate,
    room_id: str,
    country_id: int,
    player_id: str,
    db: Session = Depends(get_db)
):
    result = update_points(db, country_id, points.points, player_id, room_id)

    if result is None:
        raise HTTPException(status_code=404, detail="Points not found")

    return result


@router.patch("/position/{point_id}", response_model=PointsResponse)
def update_position_country(
    point_id: int,
    position: PositionCreate,
    db: Session = Depends(get_db)
):
    result = give_position(db, point_id, position.position)

    if result is None:
        raise HTTPException(status_code=404, detail="Points not found")

    return result


@router.get("/{room_id}/{player_id}", response_model=list[PointsResponse])
def get_all_points(
    room_id: str,
    player_id: str,
    db: Session = Depends(get_db)
):
    return get_all_points_from_user(db, room_id, player_id)


@router.get("/{room_id}/{player_id}/{country_id}")
def get_country_points(
    room_id: str,
    country_id: int,
    player_id: str,
    db: Session = Depends(get_db)
):
    result = get_point_from_country(db, room_id, player_id, country_id)

    if result is None:
        return None

    return result
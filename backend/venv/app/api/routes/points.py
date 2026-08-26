from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.points import give_points, get_all_points_from_user,  get_point_from_country, update_points
from schemas.points import PointsCreate, PointsResponse

router = APIRouter(prefix="/points", tags=["Points"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{room_id}/{player_id}/{country_id}", response_model=PointsResponse)
def create_points(points: PointsCreate, room_id: int, country_id:int, player_id: int, db: Session = Depends(get_db)):
    return give_points(db, country_id, points.points, player_id, room_id)

@router.patch("/{room_id}/{player_id}/{country_id}", response_model=PointsResponse)
def update_points_country(points: PointsCreate, room_id: int, country_id:int, player_id: int, db: Session = Depends(get_db)):
    return update_points(db, country_id, points.points, player_id, room_id)

@router.get("/{room_id}/{player_id}", response_model=list[PointsResponse])
def get_all_points(room_id: int, player_id: int,db: Session = Depends(get_db)):
    return get_all_points_from_user(db, room_id,  player_id)


@router.get("/{room_id}/{player_id}/{country_id}")
def get_country_points(room_id: int, country_id:int, player_id: int,db: Session = Depends(get_db)):
    return get_point_from_country(db,room_id, player_id, country_id)


    


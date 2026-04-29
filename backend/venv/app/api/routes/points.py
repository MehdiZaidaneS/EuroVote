from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.points import give_points, get_all_points_from_user
from schemas.points import PointsCreate, PointsResponse

router = APIRouter(prefix="/points", tags=["Points"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=PointsResponse)
def create_points_endpoint(points: PointsCreate, db: Session = Depends(get_db)):
    return give_points(db, points.country_name, points.points, points.player_id, points.room_id)

@router.get("/{room_id}/{player_id}")
def get_all_points(room_id: int, player_id: int,db: Session = Depends(get_db)):
    return get_all_points_from_user(db, room_id,  player_id)



    


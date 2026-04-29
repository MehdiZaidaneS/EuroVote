
from sqlalchemy.orm import Session
from models.points import Points


def give_points(db: Session, country_name: str, points=int , player_id= int, room_id= int):
    points = Points(country_name=country_name, points=points, player_id= player_id, room_id = room_id)
    db.add(points)
    db.commit()
    db.refresh(points)
    return points


def get_all_points_from_user(db: Session,room_id: int, player_id: int):
    return db.query(Points).filter(Points.player_id == player_id).filter(Points.room_id == room_id).all()
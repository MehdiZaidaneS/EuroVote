
from sqlalchemy.orm import Session
from models.points import Points
from models.room import Room
from models.user import User


def give_points(db: Session,country_id: int,point_value: int,player_id: int,room_id: int):
    room = db.query(Room).filter(Room.id == room_id).first()
    user = db.get(User, player_id)

    if room is None or user is None:
        return None

    if user not in room.players:
        return None

    new_points = Points(
        country_id=country_id,
        points=point_value,
        player_id=player_id,
        room_id=room_id
    )

    db.add(new_points)
    db.commit()
    db.refresh(new_points)

    return new_points


def update_points(db: Session,
    country_id: int,
    point_value: int,
    player_id: int,
    room_id: int
):
    room = db.query(Room).filter(Room.id == room_id).first()
    user = db.get(User, player_id)

    if room is None or user is None:
        return None

    if user not in room.players:
        return None

    existing_points = db.query(Points).filter(
        Points.country_id == country_id,
        Points.player_id == player_id,
        Points.room_id == room_id
    ).first()

    if existing_points is None:
        return None

    existing_points.points = point_value

    db.commit()
    db.refresh(existing_points)

    return existing_points


def get_point_from_country(db:Session, room_id:int, player_id:int, country_id:int):
    return db.query(Points).filter(Points.room_id == room_id).filter(Points.player_id == player_id).filter(Points.country_id== country_id).first()

def get_all_points_from_user(db: Session,room_id: int, player_id: int):
    return db.query(Points).filter(Points.player_id == player_id).filter(Points.room_id == room_id).all()
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from core.database import Base
from models.room import room_players


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    points = relationship(
        "Points",
        back_populates="player"
    )

    rooms = relationship(
        "Room",
        secondary=room_players,
        back_populates="players"
    )
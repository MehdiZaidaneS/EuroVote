from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base


room_players = Table(
    "room_players",
    Base.metadata,
    Column("room_id", ForeignKey("rooms.id"), primary_key=True),
    Column("user_id", ForeignKey("users.id"), primary_key=True)
)


class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer, nullable=False)
    code = Column(String, nullable=False, unique=True)

    players = relationship(
        "User",
        secondary=room_players,
        back_populates="rooms"
    )

    points = relationship(
        "Points",
        back_populates="room"
    )
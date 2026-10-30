from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base
import uuid


room_players = Table(
    "room_players",
    Base.metadata,
    Column("room_id", ForeignKey("rooms.id"), primary_key=True),
    Column("user_id", ForeignKey("users.id"), primary_key=True)
)


class Room(Base):
    __tablename__ = "rooms"

    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )
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
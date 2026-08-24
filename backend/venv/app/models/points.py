from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base


class Points(Base):
    __tablename__ = "points"

    id = Column(Integer, primary_key=True, index=True)
    country_id = Column(Integer, ForeignKey("country.id"), nullable=False)
    points = Column(Integer, nullable=False)

    player_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    room_id = Column(Integer, ForeignKey("rooms.id"), nullable=False)

    player = relationship("User", back_populates="points")
    room = relationship("Room", back_populates="points")
    country = relationship("Country", back_populates="points")
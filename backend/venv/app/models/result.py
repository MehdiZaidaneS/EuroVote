from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    country_id = Column(Integer, ForeignKey("country.id"), nullable=False)
    points = Column(Integer, nullable=False)
    position = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)

    artist = Column(String, nullable=False)
    song = Column(String, nullable=False)
    info = Column(String, nullable=False)
    img = Column(String, nullable=False)

    

    country = relationship("Country", back_populates="results")
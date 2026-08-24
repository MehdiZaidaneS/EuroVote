from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from core.database import Base





class Country(Base):
    __tablename__ = "country"

    id = Column(Integer, primary_key=True, index=True)
    country_name= Column(String, nullable=False) 

    results = relationship(
    "Result",
    back_populates="country"
    )

    points = relationship(
        "Points",
        back_populates= "country"
    )   
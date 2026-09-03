from pydantic import BaseModel
from typing import Optional

from schemas.country import CountryResponse

class PointsCreate(BaseModel):
    points: int


class PositionCreate(BaseModel):
    position: int

class PointsResponse(BaseModel):
    id: int
    points: int
    position: Optional[int]
    player_id: int
    room_id: int
    country: CountryResponse

    class Config:
        from_attributes = True
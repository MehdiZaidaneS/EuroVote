from pydantic import BaseModel

from schemas.country import CountryResponse

class PointsCreate(BaseModel):
    points: int


class PointsResponse(BaseModel):
    id: int
    points: int
    position: int
    player_id: int
    room_id: int
    country: CountryResponse

    class Config:
        from_attributes = True
from pydantic import BaseModel

class PointsCreate(BaseModel):
    country_name: str
    points: int
    player_id: int
    room_id: int


class PointsResponse(BaseModel):
    id: int
    country_name: str
    points: int
    player_id: int
    room_id: int

    class Config:
        from_attributes = True
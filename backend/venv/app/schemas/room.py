from pydantic import BaseModel

class RoomCreate(BaseModel):
    name: str
    creator_id: int


class RoomResponse(BaseModel):
    id: int
    name: str
    creator_id: int

    class Config:
        from_attributes = True
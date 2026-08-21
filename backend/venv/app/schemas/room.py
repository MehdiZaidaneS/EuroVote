from pydantic import BaseModel

class RoomCreate(BaseModel):
    name: str


class RoomResponse(BaseModel):
    id: int
    name: str
    code: str

    class Config:
        from_attributes = True
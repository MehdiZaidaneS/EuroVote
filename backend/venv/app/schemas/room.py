from pydantic import BaseModel


class RoomCreate(BaseModel):
    year: int


class JoinRoomCreate(BaseModel):
    player_id: int

class PlayerResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class RoomResponse(BaseModel):
    id: int
    year: int
    code: str
    players: list[PlayerResponse]

    class Config:
        from_attributes = True
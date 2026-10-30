from pydantic import BaseModel


class RoomCreate(BaseModel):
    year: int


class JoinRoomCreate(BaseModel):
    player_id: str


class PlayerResponse(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True


class RoomResponse(BaseModel):
    id: str
    year: int
    code: str
    players: list[PlayerResponse]

    class Config:
        from_attributes = True
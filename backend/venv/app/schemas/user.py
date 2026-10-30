from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str


class UserResponse(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True
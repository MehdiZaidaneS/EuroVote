from pydantic import BaseModel

class CountryCreate(BaseModel):
    country_name: str
    wins: int
    last_participation_year:int
    last_participation_pos: int


class CountryResponse(BaseModel):
    id: int
    country_name: str
    wins: int
    last_participation_year:int
    last_participation_pos: int

    class Config:
        from_attributes = True
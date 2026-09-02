


from pydantic import BaseModel
from schemas.country import CountryResponse

class ResultsCreate(BaseModel):
    country_id: int
    points: int
    position: int
    year: int
    artist: str
    song: str
    info: str
    img: str
    


class ResultsResponse(BaseModel):
    id: int
    points: int
    position: int
    year: int
    artist: str
    song: str
    info: str
    img: str
    country: CountryResponse

    class Config:
        from_attributes = True
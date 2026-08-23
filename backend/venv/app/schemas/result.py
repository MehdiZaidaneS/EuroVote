


from pydantic import BaseModel
from schemas.country import CountryResponse

class ResultsCreate(BaseModel):
    country_id: int
    points: int
    position: int
    year: int


class ResultsResponse(BaseModel):
    id: int
    points: int
    position: int
    year: int
    country: CountryResponse

    class Config:
        from_attributes = True
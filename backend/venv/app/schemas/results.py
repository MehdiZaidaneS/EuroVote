


from pydantic import BaseModel

class ResultsCreate(BaseModel):
    country_name: str
    points: int
    position: int
    year: int


class ResultsResponse(BaseModel):
    id: int
    country_name: str
    points: int
    position: int
    year: int

    class Config:
        from_attributes = True
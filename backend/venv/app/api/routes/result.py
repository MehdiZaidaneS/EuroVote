from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.result import (
    create_result,
    get_results_by_year,
    get_results_by_country
)
from schemas.result import ResultsCreate, ResultsResponse

router = APIRouter(prefix="/results", tags=["Results"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ResultsResponse)
def create_result_route(result: ResultsCreate,db: Session = Depends(get_db)):
    return create_result(
        db,
        result.country_id,
        result.points,
        result.position,
        result.year,
        result.artist,
        result.song,
        result.info,
        result.img
    )


@router.get("/year/{year}", response_model=list[ResultsResponse])
def get_results_for_year(year: int,db: Session = Depends(get_db)):
    return get_results_by_year(db, year)


@router.get("/country/{country_id}", response_model=list[ResultsResponse])
def get_results_for_country(country_id: int,db: Session = Depends(get_db)):
    return get_results_by_country(db, country_id)
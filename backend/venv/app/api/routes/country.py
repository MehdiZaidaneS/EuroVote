from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.database import SessionLocal
from crud.country import create_country, get_all_countries, get_country
from schemas.country import CountryCreate, CountryResponse

router = APIRouter(prefix="/country", tags=["Country"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=CountryResponse)
def add_country(country: CountryCreate, db: Session = Depends(get_db)):
    return create_country(db, country.country_name)


@router.get("/", response_model=list[CountryResponse])
def read_countries(db: Session = Depends(get_db)):
    return get_all_countries(db)


@router.get("/{country_id}", response_model=CountryResponse)
def read_country(country_id: int, db: Session = Depends(get_db)):
    return get_country(db, country_id)

from sqlalchemy.orm import Session
from models.country import Country



def create_country(
    db: Session,
    country_name: str,
    wins: int,
    last_participation_year: int,
    last_participation_pos: int
):
    existing_country = (
        db.query(Country)
        .filter(Country.country_name == country_name)
        .first()
    )

    if existing_country is not None:
        return existing_country

    country = Country(
        country_name=country_name,
        wins=wins,
        last_participation_year=last_participation_year,
        last_participation_pos=last_participation_pos
    )

    db.add(country)
    db.commit()
    db.refresh(country)

    return country

def get_all_countries(db:Session):
    return db.query(Country).all()


def get_country(db: Session, id:int):
     return db.get(Country, id)
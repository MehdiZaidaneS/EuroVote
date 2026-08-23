
from sqlalchemy.orm import Session
from models.country import Country



def create_country(db: Session, country_name: str):
    existing_country = db.query(Country).filter(Country.country_name == country_name).first()

    if existing_country is not None:
        return existing_country

    country = Country(country_name = country_name) 
     
    db.add(country)
    db.commit()
    db.refresh(country)
    return country

def get_all_countries(db:Session):
    return db.query(Country).all()


def get_country(db: Session, id:int):
     return db.get(Country, id)
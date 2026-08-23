
from sqlalchemy.orm import Session, joinedload
from models.result import Result



def create_result(db: Session, country_id: int, points: int, position: int, year:int ):
    result = Result(country_id = country_id, points= points, position= position, year= year)
    db.add(result)
    db.commit()
    db.refresh(result)
    return result

def get_results_by_year(db: Session, year: int):
    return (
        db.query(Result)
        .options(joinedload(Result.country))
        .filter(Result.year == year)
        .all()
    )


def get_results_by_country(db: Session, country_id: int):
    return db.query(Result).filter(Result.country_id == country_id).all()



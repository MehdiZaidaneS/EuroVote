from pathlib import Path
from sqlalchemy import text
from core.database import engine

base_dir = Path(__file__).resolve().parent

countries_sql = (base_dir / "countries.sql").read_text(encoding="utf-8")
results_sql = (base_dir / "populate.sql").read_text(encoding="utf-8")

with engine.begin() as connection:
    connection.execute(text(countries_sql))

    connection.execute(
        text("DELETE FROM results WHERE year = :year"),
        {"year": 2026},
    )

    connection.execute(text(results_sql))

print("Countries and Eurovision results populated successfully")
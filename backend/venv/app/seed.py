
from pathlib import Path

from sqlalchemy import text
from core.database import engine

sql = Path("populate.sql").read_text(encoding="utf-8")

with engine.begin() as connection:
    # Replace the existing 2026 results on each run.
    connection.execute(
        text("DELETE FROM results WHERE year = :year"),
        {"year": 2026},
    )

    connection.execute(text(sql))

print("Eurovision 2026 results populated successfully")

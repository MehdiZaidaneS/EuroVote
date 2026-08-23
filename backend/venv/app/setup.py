from core.database import Base, engine

from models.room import Room
from models.user import User
from models.points import Points
from models.country import Country
from models.result import Result

print("DATABASE:", engine.url)
print("TABLES BEFORE CREATE:")
print(Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)

print("TABLES AFTER CREATE:")
print(Base.metadata.tables.keys())

print("Tables created successfully")
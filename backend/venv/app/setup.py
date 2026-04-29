from core.database import Base, engine
from models.room import Room
from models.user import User
from models.points import Points
from models.country import Country # ensure relationships are registered

Base.metadata.create_all(bind=engine)

print("Tables created successfully")
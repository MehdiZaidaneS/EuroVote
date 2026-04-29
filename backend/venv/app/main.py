from fastapi import FastAPI
from api.routes.user import router as user_router
from api.routes.room import router as room_router
from api.routes.points import router as points_router
from api.routes.country import router as country_router

app = FastAPI()

app.include_router(user_router)
app.include_router(room_router)
app.include_router(points_router)
app.include_router(country_router)

@app.get("/")
def root():
    return {"message": "EuroVote backend is running"}
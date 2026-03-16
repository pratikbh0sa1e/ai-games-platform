from fastapi import FastAPI
from app.routers import maze_router, puzzle_router, rps_router

app = FastAPI(title="AI Games Service")

app.include_router(maze_router.router)
app.include_router(puzzle_router.router)
app.include_router(rps_router.router)

@app.get("/health")
def health():
    return {"status": "ok"}

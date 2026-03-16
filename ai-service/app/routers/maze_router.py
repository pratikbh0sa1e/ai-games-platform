from fastapi import APIRouter, HTTPException
from app.models.game_models import MazeRequest, MazeResponse
from app.algorithms.bfs import bfs
from app.algorithms.dfs import dfs
from app.algorithms.astar import astar

router = APIRouter(prefix="/maze", tags=["maze"])

SOLVERS = {'bfs': bfs, 'dfs': dfs, 'astar': astar}

def _find_cell(grid, value):
    for r, row in enumerate(grid):
        for c, cell in enumerate(row):
            if cell == value:
                return [r, c]
    return None

@router.post("/solve", response_model=MazeResponse)
def solve(req: MazeRequest):
    start = req.start or _find_cell(req.grid, 'start') or [0, 0]
    end = req.end or _find_cell(req.grid, 'end') or [len(req.grid)-1, len(req.grid[0])-1]
    solver = SOLVERS.get(req.algorithm)
    if not solver:
        raise HTTPException(400, f"Unknown algorithm: {req.algorithm}")
    path = solver(req.grid, start, end)
    return MazeResponse(path=path, steps=len(path))

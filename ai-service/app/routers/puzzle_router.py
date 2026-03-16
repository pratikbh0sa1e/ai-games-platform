from fastapi import APIRouter
from app.models.game_models import PuzzleRequest, PuzzleResponse
from app.algorithms.puzzle_solver import solve_puzzle

router = APIRouter(prefix="/puzzle", tags=["puzzle"])

@router.post("/solve", response_model=PuzzleResponse)
def solve(req: PuzzleRequest):
    moves = solve_puzzle(req.board)
    return PuzzleResponse(moves=moves, steps=len(moves))

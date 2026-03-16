from fastapi import APIRouter
from app.models.game_models import PuzzleRequest, PuzzleResponse, PuzzleShuffleResponse
from app.algorithms.puzzle_solver import solve_puzzle, shuffle_puzzle

router = APIRouter(prefix="/puzzle", tags=["puzzle"])

@router.post("/solve", response_model=PuzzleResponse)
def solve(req: PuzzleRequest):
    moves, states = solve_puzzle(req.board)
    return PuzzleResponse(moves=moves, states=states, steps=len(moves))

@router.get("/shuffle", response_model=PuzzleShuffleResponse)
def shuffle():
    board = shuffle_puzzle()
    return PuzzleShuffleResponse(board=board)

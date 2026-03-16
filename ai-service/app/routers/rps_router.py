from fastapi import APIRouter, HTTPException
from app.models.game_models import RPSRequest, RPSResponse
from app.algorithms.rps_ai import play

router = APIRouter(prefix="/rps", tags=["rps"])

VALID = {'rock', 'paper', 'scissors'}

@router.post("/play", response_model=RPSResponse)
def rps(req: RPSRequest):
    if req.choice not in VALID:
        raise HTTPException(400, f"Invalid choice: {req.choice}")
    result = play(req.choice)
    return RPSResponse(**result)

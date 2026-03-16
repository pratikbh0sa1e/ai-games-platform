from pydantic import BaseModel
from typing import List, Optional

class MazeRequest(BaseModel):
    grid: List[List[str]]          # 'empty' | 'wall' | 'start' | 'end'
    algorithm: str = "bfs"         # bfs | dfs | astar
    start: Optional[List[int]] = None
    end: Optional[List[int]] = None

class MazeResponse(BaseModel):
    path: List[List[int]]
    steps: int

class PuzzleRequest(BaseModel):
    board: List[List[int]]         # 3x3, 0 = blank

class PuzzleResponse(BaseModel):
    moves: List[str]
    states: List[List[List[int]]]
    steps: int

class PuzzleShuffleResponse(BaseModel):
    board: List[List[int]]

class RPSRequest(BaseModel):
    choice: str                    # rock | paper | scissors

class RPSResponse(BaseModel):
    player: str
    ai: str
    outcome: str                   # win | lose | draw

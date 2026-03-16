export type Algorithm = "bfs" | "dfs" | "astar";
export type RPSChoice = "rock" | "paper" | "scissors";
export type RPSOutcome = "win" | "lose" | "draw";
export type CellType = "empty" | "wall" | "start" | "end";

export interface MazeRequest {
  grid: CellType[][];
  algorithm: Algorithm;
  start?: [number, number];
  end?: [number, number];
}

export interface MazeResponse {
  path: [number, number][];
  steps: number;
}

export interface PuzzleRequest {
  board: number[][];
}

export interface PuzzleResponse {
  moves: string[];
  steps: number;
}

export interface RPSRequest {
  choice: RPSChoice;
}

export interface RPSResponse {
  player: RPSChoice;
  ai: RPSChoice;
  outcome: RPSOutcome;
}

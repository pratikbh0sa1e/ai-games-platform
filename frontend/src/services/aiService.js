import { post } from "./api";

export const solveMaze = (payload) => post("/api/ai/maze", payload);
export const solvePuzzle = (payload) => post("/api/ai/puzzle", payload);
export const playRPS = (payload) => post("/api/ai/rps", payload);

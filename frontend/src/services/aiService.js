import { post, get } from "./api";

export const solveMaze = (payload) => post("/api/ai/maze", payload);
export const solvePuzzle = (payload) => post("/api/ai/puzzle", payload);
export const shufflePuzzle = () => get("/api/ai/puzzle/shuffle");
export const playRPS = (payload) => post("/api/ai/rps", payload);

import { AI_SERVICE_URL } from "../config/env.js";

async function callAI(path, body) {
  const res = await fetch(`${AI_SERVICE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok)
    throw Object.assign(new Error("AI service error"), { status: res.status });
  return res.json();
}

async function getAI(path) {
  const res = await fetch(`${AI_SERVICE_URL}${path}`);
  if (!res.ok)
    throw Object.assign(new Error("AI service error"), { status: res.status });
  return res.json();
}

export const solveMaze = (payload) => callAI("/maze/solve", payload);
export const solvePuzzle = (payload) => callAI("/puzzle/solve", payload);
export const shufflePuzzle = () => getAI("/puzzle/shuffle");
export const playRPS = (payload) => callAI("/rps/play", payload);

import * as aiService from "../services/aiService.js";

export async function maze(req, res, next) {
  try {
    const result = await aiService.solveMaze(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function puzzle(req, res, next) {
  try {
    const result = await aiService.solvePuzzle(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function rps(req, res, next) {
  try {
    const result = await aiService.playRPS(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

import { Router } from "express";
import { maze, puzzle, rps } from "../controllers/aiController.js";

const router = Router();

router.post("/maze", maze);
router.post("/puzzle", puzzle);
router.post("/rps", rps);

export default router;

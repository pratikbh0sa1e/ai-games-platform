import { Router } from "express";
import {
  maze,
  puzzle,
  puzzleShuffle,
  rps,
} from "../controllers/aiController.js";

const router = Router();

router.post("/maze", maze);
router.post("/puzzle", puzzle);
router.get("/puzzle/shuffle", puzzleShuffle);
router.post("/rps", rps);

export default router;

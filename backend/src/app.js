import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.head("/health", (req, res) => res.sendStatus(200));

app.use("/api/games", gameRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

export default app;

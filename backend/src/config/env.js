import "dotenv/config";

export const PORT = process.env.PORT || 3001;
export const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://localhost:8000";

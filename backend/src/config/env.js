import "dotenv/config";

export const PORT = process.env.PORT || 3001;
export const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

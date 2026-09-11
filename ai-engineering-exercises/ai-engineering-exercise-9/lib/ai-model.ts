// Separate from lib/gemini-model.ts (AgentKit's own adapter) — this one is for structured-output calls tool handlers make internally, e.g. per-page extraction.
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY. Copy .env.example to .env and set your key.");
}

const google = createGoogleGenerativeAI({ apiKey });

export const model = google(process.env.GEMINI_MODEL ?? "gemini-2.5-flash");

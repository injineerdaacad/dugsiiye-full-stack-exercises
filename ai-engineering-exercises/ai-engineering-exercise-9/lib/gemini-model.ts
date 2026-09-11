import { gemini } from "@inngest/agent-kit";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY. Copy .env.example to .env and set your key.");
}

export const model = gemini({
  model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
  apiKey,
});

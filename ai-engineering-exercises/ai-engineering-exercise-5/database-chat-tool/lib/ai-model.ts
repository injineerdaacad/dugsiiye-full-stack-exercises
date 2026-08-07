import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("Missing API_KEY. Copy .env.example to .env and set your key.");
}

const google = createGoogleGenerativeAI({ apiKey });

export const model = google(process.env.TEXT_MODEL ?? "gemini-flash-latest");

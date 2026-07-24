import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY. Copy .env.example to .env and set your key.");
}

export const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

export const client = new OpenAI({
  apiKey,
  baseURL: process.env.GEMINI_BASE_URL ?? "https://generativelanguage.googleapis.com/v1beta/openai/",
});

import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY. Set it in .env.");
}

const gemini = createOpenAI({
  apiKey,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const model = gemini.chat(process.env.GEMINI_MODEL ?? "gemini-flash-latest");

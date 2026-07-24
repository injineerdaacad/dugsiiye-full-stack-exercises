import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("Missing API_KEY. Copy .env.example to .env and set your key.");
}

export const TEXT_MODEL = process.env.TEXT_MODEL ?? "gpt-4o-mini";

export const client = new OpenAI({
  apiKey,
  baseURL: process.env.BASE_URL,
});

export const IMAGE_MODEL = {
  name: process.env.IMAGE_MODEL ?? "dall-e-3",
  costPerImage: Number(process.env.IMAGE_MODEL_COST ?? 0.04),
};

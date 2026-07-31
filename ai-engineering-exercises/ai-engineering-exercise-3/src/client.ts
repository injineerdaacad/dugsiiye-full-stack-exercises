import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("Missing API_KEY. Copy .env.example to .env and set your key.");
}

export const API_KEY = apiKey;
export const TEXT_MODEL = process.env.TEXT_MODEL ?? "gpt-4o-mini";
export const INPUT_TOKEN_RATE = Number(process.env.TEXT_MODEL_INPUT_RATE ?? 0.15) / 1_000_000;
export const OUTPUT_TOKEN_RATE = Number(process.env.TEXT_MODEL_OUTPUT_RATE ?? 0.6) / 1_000_000;

export const client = new OpenAI({
  apiKey,
  baseURL: process.env.BASE_URL,
});


export const TTS_MODEL = process.env.TTS_MODEL ?? "gemini-2.5-flash-preview-tts";
export const TTS_BASE_URL = process.env.TTS_BASE_URL ?? "https://generativelanguage.googleapis.com/v1beta";
export const TTS_INPUT_RATE = Number(process.env.TTS_MODEL_INPUT_RATE ?? 0.5) / 1_000_000;
export const TTS_OUTPUT_RATE = Number(process.env.TTS_MODEL_OUTPUT_RATE ?? 10) / 1_000_000;

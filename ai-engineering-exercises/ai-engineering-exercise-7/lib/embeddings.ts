import { embed } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("Missing API_KEY. Copy .env.example to .env and set your key.");
}

const google = createGoogleGenerativeAI({ apiKey });
const embeddingModel = google.textEmbeddingModel(process.env.EMBEDDING_MODEL ?? "gemini-embedding-001");

export async function getEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({ model: embeddingModel, value: text });
  return embedding;
}

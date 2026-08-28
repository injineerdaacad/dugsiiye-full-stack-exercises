import { getEmbedding } from "@/lib/embeddings";
import { topKBySimilarity } from "@/lib/rag";
import diseaseData from "@/lib/data/diseases.json";

export type AnimalType = "camel" | "goat" | "sheep" | "cattle";

export type Disease = {
  id: string;
  animalTypes: AnimalType[];
  diseaseName: string;
  cause: string;
  symptoms: string[];
  transmission: string;
  treatment: string;
  medicine: string;
  prevention: string;
  urgency: "monitor at home" | "see a vet soon" | "see a vet urgently";
};

type EmbeddedDisease = Disease & { embedding: number[] };

// Computed once via Gemini's embedding API on first use, then cached in memory
// for the life of the server — no seed script or database needed for ~22 entries.
let embeddedCache: Promise<EmbeddedDisease[]> | null = null;

function getEmbeddedDiseases(): Promise<EmbeddedDisease[]> {
  if (!embeddedCache) {
    embeddedCache = Promise.all(
      (diseaseData as Disease[]).map(async (disease) => {
        const embeddingText = [
          disease.diseaseName,
          disease.animalTypes.join(", "),
          disease.symptoms.join(", "),
          disease.cause,
        ].join(". ");
        const embedding = await getEmbedding(embeddingText);
        return { ...disease, embedding };
      }),
    );
  }
  return embeddedCache;
}

export async function findRelevantDiseases(
  animalType: AnimalType,
  symptoms: string,
  k = 3,
): Promise<Disease[]> {
  const all = await getEmbeddedDiseases();
  const candidates = all.filter((disease) => disease.animalTypes.includes(animalType));
  if (candidates.length === 0) return [];

  const queryEmbedding = await getEmbedding(symptoms);
  const top = topKBySimilarity(queryEmbedding, candidates, k);

  return top.map((doc) => {
    const { animalTypes, diseaseName, cause, symptoms: docSymptoms, transmission, treatment, medicine, prevention, urgency, id } = doc;
    return { id, animalTypes, diseaseName, cause, symptoms: docSymptoms, transmission, treatment, medicine, prevention, urgency };
  });
}

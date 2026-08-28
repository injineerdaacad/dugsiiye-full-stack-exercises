function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function topKBySimilarity<T extends { embedding: number[] }>(
  queryEmbedding: number[],
  documents: T[],
  k: number,
): T[] {
  return [...documents]
    .sort((a, b) => cosineSimilarity(queryEmbedding, b.embedding) - cosineSimilarity(queryEmbedding, a.embedding))
    .slice(0, k);
}

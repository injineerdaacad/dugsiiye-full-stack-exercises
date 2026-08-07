import { getDb } from "@/lib/mongodb";
import type { OmdbMovie } from "@/lib/omdb-client";

function cacheKeyFor(title: string, year?: number) {
  return `${title.toLowerCase()}:${year ?? ""}`;
}

export async function findCachedMovie(title: string, year?: number) {
  const db = await getDb();
  const doc = await db
    .collection("movie_cache")
    .findOne({ cacheKey: cacheKeyFor(title, year) }, { projection: { _id: 0 } });
  return doc?.movie as OmdbMovie | undefined;
}

export async function cacheMovie(title: string, year: number | undefined, movie: OmdbMovie) {
  const db = await getDb();
  await db.collection("movie_cache").updateOne(
    { cacheKey: cacheKeyFor(title, year) },
    { $set: { cacheKey: cacheKeyFor(title, year), movie, cachedAt: new Date().toISOString() } },
    { upsert: true },
  );
}

export async function findCachedMoviesByGenreOrYear(genre?: string, year?: number) {
  const db = await getDb();
  const query: Record<string, unknown> = {};
  if (genre) query["movie.Genre"] = new RegExp(genre, "i");
  if (year) query["movie.Year"] = String(year);

  const docs = await db
    .collection("movie_cache")
    .find(query, { projection: { _id: 0, movie: 1 } })
    .limit(5)
    .toArray();
  return docs.map((d) => d.movie as OmdbMovie);
}

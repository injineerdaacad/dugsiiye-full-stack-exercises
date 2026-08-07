import { getDb } from "@/lib/mongodb";

export type Movie = {
  title: string;
  year: number;
  genre: string;
  rating: number;
  director: string;
  description: string;
};

export type MovieFilters = {
  genre?: string;
  minRating?: number;
  maxRating?: number;
  year?: number;
  director?: string;
};

export async function findMovies(filters: MovieFilters) {
  const db = await getDb();
  const query: Record<string, unknown> = {};

  if (filters.genre) query.genre = new RegExp(`^${filters.genre}$`, "i");
  if (filters.director) query.director = new RegExp(filters.director, "i");
  if (filters.year) query.year = filters.year;
  
  if (filters.minRating !== undefined || filters.maxRating !== undefined) {
    query.rating = {
      ...(filters.minRating !== undefined ? { $gte: filters.minRating } : {}),
      ...(filters.maxRating !== undefined ? { $lte: filters.maxRating } : {}),
    };
  }
  return db.collection("movies").find(query).project({ _id: 0 }).limit(20).toArray();
}

export async function countMoviesByGenre() {
  const db = await getDb();
  const results = await db
    .collection("movies")
    .aggregate([{ $group: { _id: "$genre", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
    .toArray();
  return results.map((r) => ({ genre: r._id, count: r.count }));
}

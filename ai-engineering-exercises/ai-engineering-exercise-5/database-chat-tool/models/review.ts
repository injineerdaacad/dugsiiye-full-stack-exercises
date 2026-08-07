import { getDb } from "@/lib/mongodb";

export type Review = {
  movie_title: string;
  user_name: string;
  rating: number;
  comment: string;
  date: string;
};

export type ReviewFilters = {
  movieTitle?: string;
  minRating?: number;
};

export async function findReviews(filters: ReviewFilters) {
  const db = await getDb();
  const query: Record<string, unknown> = {};
  
  if (filters.movieTitle) query.movie_title = new RegExp(filters.movieTitle, "i");
  if (filters.minRating !== undefined) query.rating = { $gte: filters.minRating };
  return db.collection("reviews").find(query).project({ _id: 0 }).limit(20).toArray();
}

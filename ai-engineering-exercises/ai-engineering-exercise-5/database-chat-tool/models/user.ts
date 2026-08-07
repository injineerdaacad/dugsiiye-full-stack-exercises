import { getDb } from "@/lib/mongodb";

export type User = {
  name: string;
  email: string;
  age: number;
  favorite_genre: string;
};

export type UserFilters = {
  minAge?: number;
  maxAge?: number;
  favoriteGenre?: string;
};

export async function findUsers(filters: UserFilters) {
  const db = await getDb();
  const query: Record<string, unknown> = {};
  
  if (filters.favoriteGenre) query.favorite_genre = new RegExp(`^${filters.favoriteGenre}$`, "i");
  if (filters.minAge !== undefined || filters.maxAge !== undefined) {
    query.age = {
      ...(filters.minAge !== undefined ? { $gte: filters.minAge } : {}),
      ...(filters.maxAge !== undefined ? { $lte: filters.maxAge } : {}),
    };
  }
  return db.collection("users").find(query).project({ _id: 0 }).limit(20).toArray();
}

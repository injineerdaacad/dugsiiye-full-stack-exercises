import { getDb } from "@/lib/mongodb";
import type { Category } from "@/lib/jokes-client";

export async function saveJoke(id: string, category: Category, text: string, source: "api" | "local") {
  const db = await getDb();
  await db.collection("jokes").updateOne(
    { id },
    { $setOnInsert: { id, category, text, source, upvotes: 0, downvotes: 0 } },
    { upsert: true },
  );
}

export async function findJokesByKeyword(keyword: string, limit = 10) {
  const db = await getDb();
  return db
    .collection("jokes")
    .find({ text: new RegExp(keyword, "i") }, { projection: { _id: 0 } })
    .limit(limit)
    .toArray();
}

export async function rateJoke(jokeId: string, thumbsUp: boolean) {
  const db = await getDb();
  const field = thumbsUp ? "upvotes" : "downvotes";
  return db.collection("jokes").findOneAndUpdate(
    { id: jokeId },
    { $inc: { [field]: 1 } },
    { returnDocument: "after", projection: { _id: 0 } },
  );
}

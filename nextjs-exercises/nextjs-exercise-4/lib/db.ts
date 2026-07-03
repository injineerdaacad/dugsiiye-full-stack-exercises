import { Db, MongoClient } from "mongodb";
import { config } from "@/config";

if (!config.mongodb.uri) {
  throw new Error("MONGODB_URI is not defined");
}

type MongoCache = {
  client: MongoClient | null;
  db: Db | null;
};

const globalForMongo = globalThis as typeof globalThis & {
  mongo: MongoCache;
};

if (!globalForMongo.mongo) {
  globalForMongo.mongo = { client: null, db: null };
}

export async function connectToDatabase(): Promise<Db> {
  if (globalForMongo.mongo.db) {
    return globalForMongo.mongo.db;
  }

  const client =
    globalForMongo.mongo.client ?? new MongoClient(config.mongodb.uri);

  if (!globalForMongo.mongo.client) {
    await client.connect();
    globalForMongo.mongo.client = client;
  }

  const db = client.db(config.mongodb.dbName);
  globalForMongo.mongo.db = db;

  return db;
}

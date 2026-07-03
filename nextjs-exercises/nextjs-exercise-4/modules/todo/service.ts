import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { TODO_COLLECTION } from "./constants";
import type { CreateTodoInput, TodoDocument, UpdateTodoInput } from "./types";
import { isValidTodoId } from "./queries";

export async function createTodo(input: CreateTodoInput): Promise<string> {
  const db = await connectToDatabase();

  const result = await db.collection<TodoDocument>(TODO_COLLECTION).insertOne({
    title: input.title,
    completed: false,
    priority: input.priority,
    createdAt: new Date(),
  });

  return result.insertedId.toString();
}

export async function updateTodo(id: string, input: UpdateTodoInput): Promise<boolean> {
  if (!isValidTodoId(id)) return false;

  const db = await connectToDatabase();

  const result = await db.collection<TodoDocument>(TODO_COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } }
  );

  return result.matchedCount > 0;
}

export async function deleteTodo(id: string): Promise<boolean> {
  if (!isValidTodoId(id)) return false;

  const db = await connectToDatabase();

  const result = await db
    .collection<TodoDocument>(TODO_COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount > 0;
}

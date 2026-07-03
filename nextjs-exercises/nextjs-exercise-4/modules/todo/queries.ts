import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { TODO_COLLECTION } from "./constants";
import type { Priority, Todo, TodoDocument, TodoFilter } from "./types";

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

function mapTodo(doc: TodoDocument & { _id: ObjectId }): Todo {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    completed: doc.completed,
    priority: doc.priority ?? "medium",
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

export function isValidTodoId(id: string) {
  return ObjectId.isValid(id);
}

export async function getTodos(filter?: TodoFilter): Promise<Todo[]> {
  const db = await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (filter?.search) {
    query.title = { $regex: filter.search, $options: "i" };
  }

  if (filter?.status === "completed") {
    query.completed = true;
  } else if (filter?.status === "pending") {
    query.completed = false;
  }

  const docs = await db
    .collection<TodoDocument>(TODO_COLLECTION)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return docs
    .map(mapTodo)
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
}

export async function getTodoById(id: string): Promise<Todo | null> {
  if (!isValidTodoId(id)) return null;

  const db = await connectToDatabase();

  const doc = await db
    .collection<TodoDocument>(TODO_COLLECTION)
    .findOne({ _id: new ObjectId(id) });

  if (!doc) return null;

  return mapTodo(doc);
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodoSchema, updateTodoSchema } from "./schema";
import { createTodo, deleteTodo, updateTodo } from "./service";
import { getTodoById } from "./queries";
import { TODO_ROUTES } from "./constants";
import { canCreateTodo, canDeleteTodo, canUpdateTodo } from "./permissions";
import type { ActionState } from "./types";

export async function createTodoAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  if (!canCreateTodo()) {
    return { error: "You do not have permission to create todos" };
  }

  const parsed = createTodoSchema.safeParse({
    title: formData.get("title"),
    priority: formData.get("priority"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await createTodo(parsed.data);

  revalidatePath(TODO_ROUTES.list);
  redirect(TODO_ROUTES.list);
}

export async function updateTodoAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  if (!canUpdateTodo()) {
    return { error: "You do not have permission to update todos" };
  }

  const parsed = updateTodoSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    priority: formData.get("priority"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const success = await updateTodo(parsed.data.id, {
    title: parsed.data.title,
    priority: parsed.data.priority,
  });

  if (!success) {
    return { error: "Todo not found" };
  }

  revalidatePath(TODO_ROUTES.list);
  redirect(TODO_ROUTES.list);
}

export async function toggleTodoAction(id: string) {
  if (!canUpdateTodo()) return;

  const todo = await getTodoById(id);
  if (!todo) return;

  await updateTodo(id, { completed: !todo.completed });

  revalidatePath(TODO_ROUTES.list);
}

export async function deleteTodoAction(id: string) {
  if (!canDeleteTodo()) return;

  await deleteTodo(id);

  revalidatePath(TODO_ROUTES.list);
}

export async function bulkDeleteAction(ids: string[]) {
  if (!canDeleteTodo()) return;

  await Promise.all(ids.map((id) => deleteTodo(id)));

  revalidatePath(TODO_ROUTES.list);
}

export async function bulkCompleteAction(ids: string[], completed: boolean) {
  if (!canUpdateTodo()) return;

  await Promise.all(ids.map((id) => updateTodo(id, { completed })));

  revalidatePath(TODO_ROUTES.list);
}

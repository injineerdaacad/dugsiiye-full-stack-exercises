"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { taskSchema, type TaskInput } from "@/lib/validations";

async function requireUserId() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session.user.id;
}

export async function getTasks() {
  const userId = await requireUserId();
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(input: TaskInput) {
  const userId = await requireUserId();
  const data = taskSchema.parse(input);

  return prisma.task.create({
    data: { ...data, userId },
  });
}

export async function updateTask(id: string, input: TaskInput) {
  const userId = await requireUserId();
  const data = taskSchema.parse(input);

  return prisma.task.update({
    where: { id, userId },
    data,
  });
}

export async function deleteTask(id: string) {
  const userId = await requireUserId();
  await prisma.task.delete({ where: { id, userId } });
  return { id };
}

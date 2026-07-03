import { z } from "zod";
import { TODO_LIMITS } from "./constants";

const priorityEnum = z.enum(["low", "medium", "high"]).default("medium");

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(TODO_LIMITS.titleMin, "Title is required")
    .max(TODO_LIMITS.titleMax, "Title must be less than 200 characters"),
  priority: priorityEnum,
});

export const updateTodoSchema = z.object({
  id: z.string().min(1, "Todo ID is required"),
  title: z
    .string()
    .trim()
    .min(TODO_LIMITS.titleMin, "Title is required")
    .max(TODO_LIMITS.titleMax, "Title must be less than 200 characters"),
  priority: priorityEnum,
});

export type CreateTodoSchema = z.infer<typeof createTodoSchema>;
export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>;

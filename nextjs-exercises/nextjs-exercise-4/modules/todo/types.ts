export type Priority = "low" | "medium" | "high";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  updatedAt?: string;
};

export type TodoDocument = {
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt?: Date;
};

export type CreateTodoInput = {
  title: string;
  priority: Priority;
};

export type UpdateTodoInput = {
  title?: string;
  completed?: boolean;
  priority?: Priority;
};

export type TodoFilter = {
  search?: string;
  status?: "all" | "completed" | "pending";
};

export type ActionState = {
  error?: string;
  success?: string;
} | null;

export const TODO_COLLECTION = "todos";

export const TODO_ROUTES = {
  list: "/",
  create: "/new",
  edit: (id: string) => `/edit/${id}`,
};

export const TODO_LIMITS = {
  titleMin: 1,
  titleMax: 200,
};

export const PRIORITY_OPTIONS = [
  { value: "low" as const, label: "Low" },
  { value: "medium" as const, label: "Medium" },
  { value: "high" as const, label: "High" },
];
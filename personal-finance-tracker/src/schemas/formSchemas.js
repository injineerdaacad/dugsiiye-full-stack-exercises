import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
});

export const adminUserSchema = registerSchema.extend({
  role: z.enum(["user", "admin"]),
  isActive: z.enum(["true", "false"]).transform((value) => value === "true"),
});

export const transactionSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(2, "Choose a category"),
  date: z.string().min(1, "Date is required"),
});

export function validateForm(schema, payload) {
  const result = schema.safeParse(payload);

  if (result.success) {
    return { data: result.data, errors: {} };
  }

  return {
    data: null,
    errors: Object.fromEntries(
      result.error.issues.map((issue) => [issue.path.join("."), issue.message])
    ),
  };
}

import { z } from "zod";

const transactionDateSchema = z.string().refine(
  (value) => !Number.isNaN(Date.parse(value)),
  "Date must be a valid date"
);

export const CreateTransactionSchema = z.object({
  title: z.string()
    .min(2, "Title must be at least 2 characters long")
    .max(100, "Title must be at most 100 characters long"),

  amount: z.number()
    .positive("Amount must be greater than zero"),

  type: z.enum(["income", "expense"]),

  category: z.string()
    .min(2, "Category must be at least 2 characters long")
    .max(50, "Category must be at most 50 characters long"),

  date: transactionDateSchema,
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),

  email: z.string()
    .email("Email must be a valid email"),

  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
});

export const UpdateUserSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long")
    .optional(),

  email: z.string()
    .email("Email must be a valid email")
    .optional(),

  role: z.enum(["user", "admin"]).optional(),

  isActive: z.boolean().optional(),

  profilePicture: z.string()
    .url("Profile picture must be a valid URL")
    .nullable()
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  "At least one field is required"
);

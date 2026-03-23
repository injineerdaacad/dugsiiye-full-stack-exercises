import { z } from "zod";

export const CreateUserSchema = z.object({
    name : z.string()
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name must be at most 50 characters long'),

    email: z.string()
        .email('Email must be a valid email'),

    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password must be at most 100 characters long'),
});
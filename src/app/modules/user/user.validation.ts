import { z } from "zod";

export const createUserValidation = z.object({
  name: z
    .string({
      required_error: "Name is required!",
      invalid_type_error: "Name must be a string!",
    })
    .min(2, { message: "Name must be at least 2 characters long!" })
    .max(50, { message: "Name must be at most 50 characters long!" }),

  email: z
    .string({
      required_error: "Email is required!",
      invalid_type_error: "Email must be a string!",
    })
    .email({ message: "Invalid email address!" }),

  password: z
    .string({
      required_error: "Password is required!",
      invalid_type_error: "Password must be a string!",
    })
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter!" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter!" })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character!" }),

  photoURL: z
    .string({
      required_error: "Photo URL is required!",
      invalid_type_error: "Photo URL must be a string!",
    })
    .url({ message: "Invalid Photo URL!" }),
});


export const ZodValidations = { createUserValidation };

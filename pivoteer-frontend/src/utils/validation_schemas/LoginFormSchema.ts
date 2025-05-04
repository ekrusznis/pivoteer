import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required") // Ensure it's not empty
    .email("Invalid email address"), // Validate email format

  password: z
    .string()
    .nonempty("Password is required") // Ensure it's not empty
    .min(8, "Password must be at least 8 characters long") // Minimum length
    .max(32, "Password must not exceed 32 characters") // Maximum length
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Require at least one uppercase letter
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // Require at least one lowercase letter
    .regex(/[0-9]/, "Password must contain at least one number") // Require at least one number
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});
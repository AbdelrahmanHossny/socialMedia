import { z } from "zod";

export const signup = {
  body: z.object({
    username: z.string().min(2).max(20),
    email: z.email(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])(?!.*\s).{8,64}$/, {
        error:
          "Password must be 8-64 chars, include upper, lower, digit, special, and no spaces.",
      }),
    confirmPassword: z.string(),
  }),
};

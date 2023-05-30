import * as z from "zod";

const signInSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignInSchema = z.infer<typeof signInSchema>;

export { signInSchema };
export type { SignInSchema };

import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Informe o e-mail.")
    .pipe(z.email("Informe um e-mail válido.")),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

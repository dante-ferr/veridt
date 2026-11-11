import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    passwordConfirmation: z.string().min(1, "Confirme a senha."),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "As senhas não conferem.",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

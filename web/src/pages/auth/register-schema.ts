import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const registerSchema = z
  .object({
    profile: z.enum(["lawyer", "common_user"]),
    fullName: z
      .string()
      .trim()
      .min(3, "Informe o nome completo.")
      .max(160, "O nome deve ter no máximo 160 caracteres."),
    email: z
      .string()
      .trim()
      .min(1, "Informe o e-mail.")
      .pipe(z.email("Informe um e-mail válido.")),
    cpf: z
      .string()
      .refine((value) => cpf.isValid(value), "Informe um CPF válido."),
    oab: z.string().trim(),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    passwordConfirmation: z.string().min(1, "Confirme a senha."),
    acceptedTerms: z
      .boolean()
      .refine(Boolean, "Aceite os termos para continuar."),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "As senhas não conferem.",
    path: ["passwordConfirmation"],
  })
  .refine(
    (values) =>
      values.profile !== "lawyer" || /^[A-Z]{2}\s?\d{1,6}$/i.test(values.oab),
    { message: "Informe a OAB no formato UF 000000.", path: ["oab"] },
  );

export type RegisterValues = z.infer<typeof registerSchema>;

import { cpf } from "cpf-cnpj-validator";
import { z } from "zod";
import { onlyDigits } from "@/lib/masks";

const required = (message: string) => z.string().trim().min(1, message);

export const billingSchema = z.object({
  fullName: z.string().trim().min(3, "Informe o nome completo."),
  email: required("Informe o e-mail.").pipe(
    z.email("Informe um e-mail válido."),
  ),
  phone: z
    .string()
    .refine((value) => onlyDigits(value).length >= 8, "Informe o telefone."),
  cpf: z
    .string()
    .refine((value) => cpf.isValid(value), "Informe um CPF válido."),
  postalCode: z
    .string()
    .refine((value) => onlyDigits(value).length === 8, "Informe o CEP."),
  street: required("Informe o endereço."),
  number: required("Informe o número."),
  complement: z.string().trim(),
  district: required("Informe o bairro."),
  city: required("Informe a cidade."),
  state: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, "Informe a UF."),
});

export type BillingValues = z.infer<typeof billingSchema>;

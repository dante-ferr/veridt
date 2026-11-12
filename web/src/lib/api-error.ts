import { isAxiosError } from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export type ApiError = {
  status: number;
  code: string;
  message: string;
};

const messages: Record<string, string> = {
  invalid_credentials: "E-mail ou senha incorretos.",
  email_not_confirmed: "Confirme seu e-mail antes de entrar.",
  account_locked:
    "A conta foi bloqueada por 15 minutos após 5 tentativas sem sucesso.",
  email_in_use: "Já existe uma conta com este e-mail.",
  cpf_in_use: "Já existe uma conta com este CPF.",
  invalid_token: "Link inválido ou expirado.",
  invalid_name: "Informe o nome completo.",
  invalid_email: "Informe um e-mail válido.",
  invalid_cpf: "Informe um CPF válido.",
  invalid_oab: "Informe a OAB no formato UF 000000.",
  password_too_short: "A senha deve ter no mínimo 8 caracteres.",
  password_mismatch: "As senhas não conferem.",
  terms_required: "Aceite os termos para continuar.",
  invalid_phone: "Informe um telefone válido.",
  invalid_postal_code: "Informe o CEP com 8 dígitos.",
  invalid_address: "Informe endereço, número, bairro e cidade.",
  invalid_region: "Informe a UF com duas letras.",
  unknown_package: "Escolha um pacote disponível.",
  not_found: "Não encontrado.",
  unauthenticated: "Entre para continuar.",
  too_many_requests: "Muitas tentativas. Aguarde um minuto e tente de novo.",
  unavailable: "Serviço indisponível no momento. Tente de novo em instantes.",
  invalid_input: "Confira os campos do formulário.",
};

const fallback = "Não foi possível concluir a operação. Tente de novo.";

export function toApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const code =
      error.response?.data?.error ??
      (status ? "request_failed" : "network_error");
    return { status, code, message: messages[code] ?? fallback };
  }
  return { status: 0, code: "unknown", message: fallback };
}

export function errorMessage(error: unknown): string {
  return toApiError(error).message;
}

export function applyApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldsByCode: Partial<Record<string, Path<T>>> = {},
): ApiError {
  const apiError = toApiError(error);
  const field = fieldsByCode[apiError.code];
  if (field) setError(field, { message: apiError.message });
  else setError("root", { message: apiError.message });
  return apiError;
}

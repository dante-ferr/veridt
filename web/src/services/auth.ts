import { http } from "@/lib/http";

export type Profile = "lawyer" | "common_user";

export type Registration = {
  profile: Profile;
  fullName: string;
  email: string;
  cpf: string;
  oab?: string;
  password: string;
  passwordConfirmation: string;
  acceptedTerms: boolean;
};

export type RegistrationResult = {
  id: string;
};

export type EmailConfirmation = {
  token: string;
};

export type PasswordRecovery = {
  email: string;
};

export type PasswordReset = {
  token: string;
  password: string;
  passwordConfirmation: string;
};

export type MessageResult = {
  message: string;
};

export async function register(
  registration: Registration,
): Promise<RegistrationResult> {
  const { data } = await http.post<RegistrationResult>(
    "/accounts",
    registration,
  );
  return data;
}

export async function confirmEmail(
  confirmation: EmailConfirmation,
): Promise<MessageResult> {
  const { data } = await http.post<MessageResult>(
    "/accounts/confirmation",
    confirmation,
  );
  return data;
}

export async function requestPasswordReset(
  recovery: PasswordRecovery,
): Promise<MessageResult> {
  const { data } = await http.post<MessageResult>(
    "/password-recoveries",
    recovery,
  );
  return data;
}

export async function resetPassword(
  reset: PasswordReset,
): Promise<MessageResult> {
  const { data } = await http.post<MessageResult>("/password-resets", reset);
  return data;
}

export type Credentials = {
  email: string;
  password: string;
};

export type PasswordReset = {
  token: string;
  password: string;
};

export type Profile = "lawyer" | "common_user";

export type Registration = {
  profile: Profile;
  fullName: string;
  email: string;
  cpf: string;
  oab?: string;
  password: string;
  acceptedTerms: boolean;
};

export async function register(_registration: Registration): Promise<void> {
  throw new Error("Cadastro ainda não está disponível.");
}

export async function signIn(_credentials: Credentials): Promise<void> {
  throw new Error("Login ainda não está disponível.");
}

export async function requestPasswordReset(_email: string): Promise<void> {
  throw new Error("Recuperação de senha ainda não está disponível.");
}

export async function resetPassword(_reset: PasswordReset): Promise<void> {
  throw new Error("Redefinição de senha ainda não está disponível.");
}

export type Credentials = {
  email: string;
  password: string;
};

export type PasswordReset = {
  token: string;
  password: string;
};

export async function signIn(_credentials: Credentials): Promise<void> {
  throw new Error("Login ainda não está disponível.");
}

export async function requestPasswordReset(_email: string): Promise<void> {
  throw new Error("Recuperação de senha ainda não está disponível.");
}

export async function resetPassword(_reset: PasswordReset): Promise<void> {
  throw new Error("Redefinição de senha ainda não está disponível.");
}

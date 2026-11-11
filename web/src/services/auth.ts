export type Credentials = {
  email: string;
  password: string;
};

export async function signIn(_credentials: Credentials): Promise<void> {
  throw new Error("Login ainda não está disponível.");
}

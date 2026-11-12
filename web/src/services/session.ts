import { authHttp, http } from "@/lib/http";

export type Credentials = {
  email: string;
  password: string;
};

export type SessionTokens = {
  accessToken: string;
  expiresAt: string;
};

export type Me = {
  id: string;
  fullName: string;
  email: string;
  profile: "lawyer" | "common_user";
};

export async function signIn(credentials: Credentials): Promise<SessionTokens> {
  const { data } = await authHttp.post<SessionTokens>("/sessions", credentials);
  return data;
}

export async function signOut(): Promise<void> {
  await authHttp.post("/sessions/logout");
}

export async function getMe(): Promise<Me> {
  const { data } = await http.get<Me>("/me");
  return data;
}

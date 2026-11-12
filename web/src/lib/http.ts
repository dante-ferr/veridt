import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useSessionStore } from "@/stores/session-store";

type RefreshResponse = { accessToken: string; expiresAt: string };
type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

export const authHttp = axios.create({ baseURL: "/v1" });

export const http = axios.create({ baseURL: "/v1" });

let refreshing: Promise<string | null> | null = null;

export function refreshAccessToken(): Promise<string | null> {
  refreshing ??= authHttp
    .post<RefreshResponse>("/sessions/refresh")
    .then(({ data }) => {
      useSessionStore.getState().setSession(data.accessToken);
      return data.accessToken;
    })
    .catch(() => {
      useSessionStore.getState().clear();
      return null;
    })
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

http.interceptors.request.use((config) => {
  const token = useSessionStore.getState().accessToken;
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

http.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as RetriableConfig | undefined;
  if (error.response?.status !== 401 || !config || config._retried) {
    throw error;
  }
  config._retried = true;
  const token = await refreshAccessToken();
  if (!token) throw error;
  config.headers.set("Authorization", `Bearer ${token}`);
  return http(config);
});

import { refreshAccessToken } from "@/lib/http";
import { useSessionStore } from "@/stores/session-store";

export async function ensureSession(): Promise<boolean> {
  const { status } = useSessionStore.getState();
  if (status === "authenticated") return true;
  if (status === "anonymous") return false;
  return (await refreshAccessToken()) !== null;
}

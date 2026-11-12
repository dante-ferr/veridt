import { create } from "zustand";

export type SessionStatus = "unknown" | "authenticated" | "anonymous";

type SessionState = {
  accessToken: string | null;
  status: SessionStatus;
  setSession: (accessToken: string) => void;
  clear: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  accessToken: null,
  status: "unknown",
  setSession: (accessToken) => set({ accessToken, status: "authenticated" }),
  clear: () => set({ accessToken: null, status: "anonymous" }),
}));

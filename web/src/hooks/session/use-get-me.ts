import { useQuery } from "@tanstack/react-query";
import { useSessionStore } from "@/stores/session-store";
import { queryKeys } from "@/lib/query-keys";

export function useGetMe() {
  const authenticated = useSessionStore(
    (state) => state.status === "authenticated",
  );
  return useQuery({ ...queryKeys.session.me, enabled: authenticated });
}

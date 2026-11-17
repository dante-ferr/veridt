import { useQuery } from "@tanstack/react-query";
import { useSessionStore } from "@/stores/session-store";
import { queryKeys } from "@/lib/query-keys";

export function useGetCreditBalance() {
  const authenticated = useSessionStore(
    (state) => state.status === "authenticated",
  );
  return useQuery({ ...queryKeys.credits.balance, enabled: authenticated });
}

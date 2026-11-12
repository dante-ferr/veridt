import { queryClient } from "@/app/query-client";
import { useCreditPurchaseStore } from "@/stores/credit-purchase-store";
import { useSessionStore } from "@/stores/session-store";

export function resetClientState() {
  useSessionStore.getState().clear();
  queryClient.clear();
  useCreditPurchaseStore.getState().reset();
}

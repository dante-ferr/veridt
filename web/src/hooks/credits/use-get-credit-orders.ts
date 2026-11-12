import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

export function useGetCreditOrders() {
  return useQuery(queryKeys.credits.orders);
}

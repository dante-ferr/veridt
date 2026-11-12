import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/credits";
import { queryKeys } from "@/lib/query-keys";

export function useBuyCredits() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.credits.orders.queryKey,
      }),
  });
}

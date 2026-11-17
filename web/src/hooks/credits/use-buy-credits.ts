import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/credits";
import { queryKeys } from "@/lib/query-keys";

export function useBuyCredits() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.credits.orders.queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.credits.balance.queryKey,
        }),
      ]);
    },
  });
}

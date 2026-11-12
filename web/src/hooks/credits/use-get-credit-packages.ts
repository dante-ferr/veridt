import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

export function useGetCreditPackages() {
  return useQuery(queryKeys.credits.packages);
}

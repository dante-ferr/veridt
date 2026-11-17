import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getBalance, listOrders, listPackages } from "@/services/credits";

export const creditKeys = createQueryKeys("credits", {
  packages: { queryKey: null, queryFn: listPackages },
  orders: { queryKey: null, queryFn: listOrders },
  balance: { queryKey: null, queryFn: getBalance },
});

import { createQueryKeys } from "@lukemorales/query-key-factory";
import { listOrders, listPackages } from "@/services/credits";

export const creditKeys = createQueryKeys("credits", {
  packages: { queryKey: null, queryFn: listPackages },
  orders: { queryKey: null, queryFn: listOrders },
});

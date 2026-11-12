import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getMe } from "@/services/session";

export const sessionKeys = createQueryKeys("session", {
  me: { queryKey: null, queryFn: getMe },
});

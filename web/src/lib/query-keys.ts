import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { creditKeys } from "@/hooks/credits/keys";
import { sessionKeys } from "@/hooks/session/keys";

export const queryKeys = mergeQueryKeys(sessionKeys, creditKeys);

import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "@/services/auth";

export function useRequestPasswordReset() {
  return useMutation({ mutationFn: requestPasswordReset });
}

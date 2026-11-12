import { useMutation } from "@tanstack/react-query";
import { confirmEmail } from "@/services/auth";

export function useConfirmEmail() {
  return useMutation({ mutationFn: confirmEmail });
}

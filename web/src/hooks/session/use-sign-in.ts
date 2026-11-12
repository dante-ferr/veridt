import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/query-client";
import { signIn } from "@/services/session";
import { useSessionStore } from "@/stores/session-store";
import { queryKeys } from "@/lib/query-keys";

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ accessToken }) => {
      queryClient.clear();
      useSessionStore.getState().setSession(accessToken);
      return queryClient.query(queryKeys.session.me);
    },
  });
}

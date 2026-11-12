import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signOut } from "@/services/session";
import { resetClientState } from "./reset-client-state";

export function useSignOut() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signOut,
    onSettled: () => {
      resetClientState();
      navigate("/login", { replace: true });
    },
  });
}

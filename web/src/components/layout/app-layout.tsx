import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { AppHeader } from "@/components/layout/app-header";
import { resetClientState } from "@/hooks/session/reset-client-state";
import { useGetMe } from "@/hooks/session/use-get-me";
import { useSignOut } from "@/hooks/session/use-sign-out";
import { useSessionStore } from "@/stores/session-store";

function AppLayout() {
  const authenticated = useSessionStore(
    (state) => state.status === "authenticated",
  );

  useEffect(() => {
    if (!authenticated) resetClientState();
  }, [authenticated]);

  if (!authenticated) return <Navigate to="/login" replace />;
  return <SignedInLayout />;
}

function SignedInLayout() {
  const me = useGetMe();
  const signOut = useSignOut();

  return (
    <div className="min-h-svh">
      <AppHeader
        userName={me.data?.fullName ?? "—"}
        balance={0}
        onSignOut={() => signOut.mutate()}
        signingOut={signOut.isPending}
      />
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}

export { AppLayout };

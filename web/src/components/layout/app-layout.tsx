import { Outlet, useNavigate } from "react-router";
import { AppHeader } from "@/components/layout/app-header";

function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-svh">
      <AppHeader
        userName="Ana Ribeiro"
        balance={0}
        onSignOut={() => navigate("/login")}
      />
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}

export { AppLayout };

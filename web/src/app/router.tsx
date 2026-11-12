import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/components/layout/app-layout";
import AccountPage from "@/pages/account/account-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import ResetPasswordPage from "@/pages/auth/reset-password-page";
import BillingPage from "@/pages/credits/billing-page";
import CreditsPage from "@/pages/credits/credits-page";
import NewRecordPage from "@/pages/records/new-record-page";
import RecordsPage from "@/pages/records/records-page";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: "/records", element: <RecordsPage /> },
      { path: "/records/new", element: <NewRecordPage /> },
      { path: "/credits", element: <CreditsPage /> },
      { path: "/credits/billing", element: <BillingPage /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
]);

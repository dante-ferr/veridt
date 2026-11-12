import { createBrowserRouter } from "react-router";
import { redirectIfAuthenticated } from "@/app/middleware/redirect-if-authenticated";
import { requireSession } from "@/app/middleware/require-session";
import { AppLayout } from "@/components/layout/app-layout";
import AccountPage from "@/pages/account/account-page";
import ConfirmEmailPage from "@/pages/auth/confirm-email-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import ResetPasswordPage from "@/pages/auth/reset-password-page";
import BillingPage from "@/pages/credits/billing-page";
import CreditsPage from "@/pages/credits/credits-page";
import NewRecordPage from "@/pages/records/new-record-page";
import RecordsPage from "@/pages/records/records-page";

export const router = createBrowserRouter([
  {
    middleware: [redirectIfAuthenticated],
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  { path: "/confirm", element: <ConfirmEmailPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  {
    element: <AppLayout />,
    middleware: [requireSession],
    children: [
      { path: "/records", element: <RecordsPage /> },
      { path: "/records/new", element: <NewRecordPage /> },
      { path: "/credits", element: <CreditsPage /> },
      { path: "/credits/billing", element: <BillingPage /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
]);

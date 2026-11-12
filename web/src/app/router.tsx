import { createBrowserRouter } from "react-router";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import ResetPasswordPage from "@/pages/auth/reset-password-page";
import RecordsPage from "@/pages/records/records-page";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/records", element: <RecordsPage /> },
]);

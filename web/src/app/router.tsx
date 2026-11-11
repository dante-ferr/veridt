import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/auth/login-page";
import RecordsPage from "@/pages/records/records-page";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/records", element: <RecordsPage /> },
]);

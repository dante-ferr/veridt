import { redirect, type MiddlewareFunction } from "react-router";
import { ensureSession } from "./ensure-session";

export const redirectIfAuthenticated: MiddlewareFunction = async () => {
  if (await ensureSession()) throw redirect("/credits");
};

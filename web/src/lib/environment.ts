export type AppEnvironment = "development" | "production";

export const appEnvironment: AppEnvironment = import.meta.env.PROD
  ? "production"
  : "development";

export const isDevelopment = appEnvironment === "development";

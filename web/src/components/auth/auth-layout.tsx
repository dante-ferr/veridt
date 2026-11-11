import * as React from "react";
import { cn } from "cn";
import { Wordmark } from "@/components/brand/wordmark";

function AuthLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-8",
        className,
      )}
      {...props}
    >
      <h1>
        <Wordmark />
      </h1>
      {children}
    </main>
  );
}

export { AuthLayout };

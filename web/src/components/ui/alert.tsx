import * as React from "react";
import { cn } from "cn";

function Alert({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert"
      role="alert"
      className={cn("text-sm text-fail", className)}
      {...props}
    />
  );
}

export { Alert };

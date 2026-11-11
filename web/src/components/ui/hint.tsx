import * as React from "react";
import { cn } from "cn";

function Hint({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="hint"
      className={cn("text-xs leading-4 font-normal text-ink-muted", className)}
      {...props}
    />
  );
}

export { Hint };

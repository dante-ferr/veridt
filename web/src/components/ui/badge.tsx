import * as React from "react";
import { cn } from "cn";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-xs bg-seal-tint px-2 py-0.5 text-[13px] leading-[18px] font-medium whitespace-nowrap text-seal",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };

import * as React from "react";
import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xs border border-ink-muted bg-surface px-2 font-sans text-[15px] leading-[22px] font-normal text-ink outline-none placeholder:text-ink-muted focus-visible:border-seal focus-visible:outline-2 focus-visible:outline-seal disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-2 aria-invalid:border-fail aria-invalid:focus-visible:outline-fail",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

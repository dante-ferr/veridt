import * as React from "react";
import { cn } from "cn";

function Text({
  className,
  muted = false,
  ...props
}: React.ComponentProps<"p"> & { muted?: boolean }) {
  return (
    <p
      data-slot="text"
      className={cn(
        "text-[15px] leading-[22px] font-normal",
        muted ? "text-ink-muted" : "text-ink",
        className,
      )}
      {...props}
    />
  );
}

export { Text };

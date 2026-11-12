import * as React from "react";
import { cn } from "cn";

function ActionRow({
  className,
  divided = false,
  ...props
}: React.ComponentProps<"div"> & { divided?: boolean }) {
  return (
    <div
      data-slot="action-row"
      className={cn(
        "flex items-center justify-between gap-4",
        divided && "border-t border-line pt-4",
        className,
      )}
      {...props}
    />
  );
}

export { ActionRow };

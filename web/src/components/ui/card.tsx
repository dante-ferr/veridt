import * as React from "react";
import { cn } from "cn";
import { Slot } from "radix-ui";

function Card({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"section"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "section";

  return (
    <Comp
      data-slot="card"
      className={cn(
        "flex flex-col gap-4 rounded border border-line bg-surface p-6 text-ink",
        className,
      )}
      {...props}
    />
  );
}

export { Card };

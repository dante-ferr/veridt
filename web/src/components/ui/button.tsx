import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "inline-flex flex-none min-h-9 cursor-pointer items-center justify-center gap-1.5 rounded px-4 font-sans text-[13px] leading-[18px] font-medium whitespace-nowrap no-underline transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-default disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "border-0 bg-seal text-surface",
        outline: "border border-ink-muted bg-surface text-ink",
        danger:
          "border border-fail bg-surface text-fail focus-visible:ring-fail/30",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      full: false,
    },
  },
);

function Button({
  className,
  variant = "primary",
  full = false,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, full, className }))}
      type={asChild ? type : (type ?? "button")}
      {...props}
    />
  );
}

export { Button, buttonVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const headingVariants = cva("font-semibold text-ink", {
  variants: {
    size: {
      page: "text-[32px] leading-10",
      card: "text-xl leading-7",
    },
  },
  defaultVariants: {
    size: "card",
  },
});

type HeadingProps = React.ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    level?: "h1" | "h2" | "h3";
  };

function Heading({ className, size, level = "h2", ...props }: HeadingProps) {
  const Tag = level;

  return (
    <Tag
      data-slot="heading"
      className={cn(headingVariants({ size, className }))}
      {...props}
    />
  );
}

export { Heading };

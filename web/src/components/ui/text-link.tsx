import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Link, type LinkProps } from "react-router";

const textLinkVariants = cva(
  "text-seal underline outline-none focus-visible:outline-2 focus-visible:outline-seal",
  {
    variants: {
      size: {
        sm: "text-[13px] leading-[18px] font-medium",
        md: "text-[15px] leading-[22px] font-normal",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

function TextLink({
  className,
  size,
  ...props
}: LinkProps & VariantProps<typeof textLinkVariants>) {
  return (
    <Link
      data-slot="text-link"
      className={cn(textLinkVariants({ size, className }))}
      {...props}
    />
  );
}

export { TextLink };

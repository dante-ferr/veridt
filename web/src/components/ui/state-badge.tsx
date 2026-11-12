import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const stateBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-xs border bg-surface px-2 py-0.5 whitespace-nowrap",
  {
    variants: {
      tone: {
        pending: "border-pending text-pending",
        ok: "border-ok text-ok",
        fail: "border-fail text-fail",
        neutral: "border-ink-muted text-ink-muted",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type StateBadgeProps = VariantProps<typeof stateBadgeVariants> & {
  code: string;
  label?: string;
  className?: string;
};

function StateBadge({ code, label, tone, className }: StateBadgeProps) {
  return (
    <span
      data-slot="state-badge"
      className={cn(stateBadgeVariants({ tone, className }))}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      <span className="font-mono text-xs leading-4">{code}</span>
      {label ? (
        <span className="font-sans text-[13px] leading-[18px] text-ink">
          · {label}
        </span>
      ) : null}
    </span>
  );
}

export { StateBadge };

import type { ReactNode } from "react";
import { cn } from "cn";

type SummaryLineProps = {
  label: ReactNode;
  value: ReactNode;
  emphasis?: boolean;
};

function SummaryLine({ label, value, emphasis = false }: SummaryLineProps) {
  return (
    <div
      className={cn(
        "flex justify-between gap-3 text-[15px] leading-[22px] text-ink",
        emphasis && "border-t border-line pt-2",
      )}
    >
      <dt className="font-normal">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

export { SummaryLine };

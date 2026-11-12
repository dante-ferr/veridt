import { SummaryLine } from "@/components/credits/summary-line";
import { formatBrl } from "@/lib/format";
import type { CreditPackage } from "@/services/credits";

type OrderSummaryProps = Pick<
  CreditPackage,
  "name" | "creditCount" | "pricePerCreditCents" | "totalCents"
>;

function OrderSummary({
  name,
  creditCount,
  pricePerCreditCents,
  totalCents,
}: OrderSummaryProps) {
  return (
    <dl className="flex flex-col gap-2">
      <SummaryLine label="Pacote" value={name} />
      <SummaryLine label="Créditos" value={creditCount} />
      <SummaryLine
        label="Valor por crédito"
        value={formatBrl(pricePerCreditCents)}
      />
      <SummaryLine label="Total" value={formatBrl(totalCents)} emphasis />
    </dl>
  );
}

export { OrderSummary };

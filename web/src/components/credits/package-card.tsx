import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { formatBrl } from "@/lib/format";
import type { CreditPackage } from "@/services/credits";

type PackageCardProps = Pick<
  CreditPackage,
  "name" | "creditCount" | "pricePerCreditCents" | "totalCents" | "description"
> & {
  selected: boolean;
  onChoose: () => void;
};

function PackageCard({
  name,
  creditCount,
  pricePerCreditCents,
  totalCents,
  description,
  selected,
  onChoose,
}: PackageCardProps) {

  return (
    <Card
      asChild
      className={cn("min-w-0 flex-1", selected && "border-2 border-seal")}
    >
      <article aria-current={selected ? "true" : undefined}>
        <div className="flex items-center justify-between gap-2">
          <Heading level="h3">{name}</Heading>
          {selected ? <Badge>Selecionado</Badge> : null}
        </div>
        <p className="text-[32px] leading-10 font-semibold text-ink">
          {creditCount} créditos
        </p>
        <Text muted>
          {formatBrl(pricePerCreditCents)} por crédito · total{" "}
          {formatBrl(totalCents)}
        </Text>
        <Text>{description}</Text>
        <Button
          full
          variant={selected ? "primary" : "outline"}
          onClick={onChoose}
        >
          {selected ? `Continuar com ${name}` : `Escolher ${name}`}
        </Button>
      </article>
    </Card>
  );
}

export { PackageCard };

import { StateBadge } from "@/components/ui/state-badge";
import type { CreditOrderState } from "@/services/credits";

const orderStates = {
  billing_recorded: {
    code: "FATURAMENTO",
    label: "Registrado",
    tone: "pending",
  },
} as const;

function OrderStateBadge({ state }: { state: CreditOrderState }) {
  return <StateBadge {...orderStates[state]} />;
}

export { OrderStateBadge };

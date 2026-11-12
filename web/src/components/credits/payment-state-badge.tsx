import { StateBadge } from "@/components/ui/state-badge";
import type { PaymentState } from "@/services/credits";

const paymentStates = {
  pending: { code: "PENDENTE", label: "Pendente", tone: "pending" },
  approved: { code: "APROVADO", label: "Aprovado", tone: "ok" },
  declined: { code: "RECUSADO", label: "Recusado", tone: "fail" },
  expired: { code: "EXPIRADO", label: "Expirado", tone: "fail" },
  refunded: { code: "ESTORNADO", label: "Estornado", tone: "neutral" },
} as const;

function PaymentStateBadge({ state }: { state: PaymentState }) {
  return <StateBadge {...paymentStates[state]} />;
}

export { PaymentStateBadge };

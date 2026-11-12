import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PackageCard } from "@/components/credits/package-card";
import { PaymentStateBadge } from "@/components/credits/payment-state-badge";
import { Steps } from "@/components/credits/steps";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Hint } from "@/components/ui/hint";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTimeUtc } from "@/lib/format";
import {
  listOrders,
  listPackages,
  type CreditOrder,
  type CreditPackage,
} from "@/services/credits";
import { useCreditPurchaseStore } from "@/stores/credit-purchase-store";

const paymentMethodLabel = { pix: "Pix", checkout: "Mercado Pago" } as const;

export default function CreditsPage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [orders, setOrders] = useState<CreditOrder[]>([]);
  const [error, setError] = useState("");
  const selectedPackageId = useCreditPurchaseStore(
    (state) => state.selectedPackageId,
  );
  const selectPackage = useCreditPurchaseStore((state) => state.selectPackage);

  useEffect(() => {
    listPackages()
      .then((items) => {
        setPackages(items);
        const current = useCreditPurchaseStore.getState().selectedPackageId;
        if (!items.some((item) => item.id === current)) {
          const fallback =
            items.find((item) => item.code === "standard") ?? items[0];
          if (fallback) selectPackage(fallback.id);
        }
      })
      .catch(() => setError("Não foi possível carregar os pacotes."));
    listOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [selectPackage]);

  function choose(packageId: string) {
    selectPackage(packageId);
    navigate("/credits/billing");
  }

  return (
    <>
      <Heading size="page" level="h1">
        Comprar créditos
      </Heading>
      <Steps current={1} />
      {error ? <Alert>{error}</Alert> : null}
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        {packages.map((item) => (
          <PackageCard
            key={item.id}
            creditPackage={item}
            selected={item.id === selectedPackageId}
            onChoose={() => choose(item.id)}
          />
        ))}
      </div>
      <Hint>
        O preço fica congelado no momento da compra. Cada registro consome 1
        crédito.
      </Hint>
      <Card>
        <Heading level="h2">Histórico de compras</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data (UTC)</TableHead>
              <TableHead>Pacote</TableHead>
              <TableHead>Créditos</TableHead>
              <TableHead>Forma</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatDateTimeUtc(order.createdAt)}</TableCell>
                <TableCell>{order.packageName}</TableCell>
                <TableCell>{order.creditCount}</TableCell>
                <TableCell>{paymentMethodLabel[order.method]}</TableCell>
                <TableCell>
                  <PaymentStateBadge state={order.state} />
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>Nenhuma compra ainda.</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { PackageCard } from "@/components/credits/package-card";
import { OrderStateBadge } from "@/components/credits/order-state-badge";
import { Steps } from "@/components/credits/steps";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Hint } from "@/components/ui/hint";
import { Text } from "@/components/ui/text";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreditOrders } from "@/hooks/credits/use-get-credit-orders";
import { useGetCreditPackages } from "@/hooks/credits/use-get-credit-packages";
import { errorMessage } from "@/lib/api-error";
import { formatDateTimeUtc } from "@/lib/format";
import { useCreditPurchaseStore } from "@/stores/credit-purchase-store";

export default function CreditsPage() {
  const navigate = useNavigate();
  const packagesQuery = useGetCreditPackages();
  const ordersQuery = useGetCreditOrders();
  const packages = packagesQuery.data;
  const orders = ordersQuery.data ?? [];
  const selectedPackageId = useCreditPurchaseStore(
    (state) => state.selectedPackageId,
  );
  const selectPackage = useCreditPurchaseStore((state) => state.selectPackage);

  useEffect(() => {
    if (!packages) return;
    const current = useCreditPurchaseStore.getState().selectedPackageId;
    if (!packages.some((item) => item.id === current)) {
      const fallback =
        packages.find((item) => item.code === "standard") ?? packages[0];
      if (fallback) selectPackage(fallback.id);
    }
  }, [packages, selectPackage]);

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
      {packagesQuery.isPending ? <Text muted>Carregando pacotes…</Text> : null}
      {packagesQuery.isError ? (
        <Alert>{errorMessage(packagesQuery.error)}</Alert>
      ) : null}
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        {packages?.map((item) => (
          <PackageCard
            key={item.id}
            name={item.name}
            creditCount={item.creditCount}
            pricePerCreditCents={item.pricePerCreditCents}
            totalCents={item.totalCents}
            description={item.description}
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
        {ordersQuery.isPending ? (
          <Text muted>Carregando histórico…</Text>
        ) : null}
        {ordersQuery.isError ? (
          <Alert>{errorMessage(ordersQuery.error)}</Alert>
        ) : null}
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
                <TableCell>—</TableCell>
                <TableCell>
                  <OrderStateBadge state={order.state} />
                </TableCell>
              </TableRow>
            ))}
            {ordersQuery.isSuccess && orders.length === 0 ? (
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

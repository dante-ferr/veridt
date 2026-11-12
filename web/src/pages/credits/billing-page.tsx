import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { OrderSummary } from "@/components/credits/order-summary";
import { Steps } from "@/components/credits/steps";
import { ActionRow } from "@/components/ui/action-row";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Hint } from "@/components/ui/hint";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { useBuyCredits } from "@/hooks/credits/use-buy-credits";
import { useGetCreditPackages } from "@/hooks/credits/use-get-credit-packages";
import { useGetMe } from "@/hooks/session/use-get-me";
import { applyApiError, errorMessage } from "@/lib/api-error";
import { maskCpf, maskPhone, maskPostalCode, onlyDigits } from "@/lib/masks";
import { useCreditPurchaseStore } from "@/stores/credit-purchase-store";
import { billingSchema, type BillingValues } from "./billing-schema";

const fieldsByCode = {
  invalid_name: "fullName",
  invalid_email: "email",
  invalid_phone: "phone",
  invalid_cpf: "cpf",
  invalid_postal_code: "postalCode",
  invalid_region: "state",
  invalid_address: "street",
} as const;

export default function BillingPage() {
  const navigate = useNavigate();
  const selectedPackageId = useCreditPurchaseStore(
    (state) => state.selectedPackageId,
  );
  const resetPurchase = useCreditPurchaseStore((state) => state.reset);
  const packagesQuery = useGetCreditPackages();
  const { data: me } = useGetMe();
  const buyCredits = useBuyCredits();
  const selectedPackage = packagesQuery.data?.find(
    (item) => item.id === selectedPackageId,
  );
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BillingValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      cpf: "",
      postalCode: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
    },
  });

  useEffect(() => {
    if (!selectedPackageId || (packagesQuery.data && !selectedPackage)) {
      navigate("/credits", { replace: true });
    }
  }, [selectedPackageId, packagesQuery.data, selectedPackage, navigate]);

  useEffect(() => {
    if (!me) return;
    if (!getValues("fullName")) setValue("fullName", me.fullName);
    if (!getValues("email")) setValue("email", me.email);
  }, [me, getValues, setValue]);

  async function onSubmit(values: BillingValues) {
    if (!selectedPackage) return;
    try {
      await buyCredits.mutateAsync({
        packageId: selectedPackage.id,
        billing: {
          ...values,
          phone: onlyDigits(values.phone),
          cpf: onlyDigits(values.cpf),
          postalCode: onlyDigits(values.postalCode),
          state: values.state.toUpperCase(),
        },
      });
      resetPurchase();
      navigate("/credits");
    } catch (caught) {
      applyApiError(caught, setError, fieldsByCode);
    }
  }

  return (
    <>
      <Heading size="page" level="h1">
        Dados de faturamento
      </Heading>
      <Steps current={2} />
      {packagesQuery.isError ? (
        <Alert>{errorMessage(packagesQuery.error)}</Alert>
      ) : null}
      {errors.root ? <Alert>{errors.root.message}</Alert> : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_320px]"
      >
        <Card>
          <Heading level="h2">Comprador</Heading>
          <Field
            label="Nome completo"
            id="billing-full-name"
            autoComplete="name"
            placeholder="Ana Ribeiro"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            <Field
              label="E-mail"
              id="billing-email"
              type="email"
              autoComplete="email"
              placeholder="nome@exemplo.com.br"
              error={errors.email?.message}
              {...register("email")}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Field
                  label="Telefone"
                  id="billing-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(71) 90000-0000"
                  error={errors.phone?.message}
                  {...field}
                  onChange={(event) =>
                    field.onChange(maskPhone(event.target.value))
                  }
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="cpf"
            render={({ field }) => (
              <Field
                label="CPF"
                id="billing-cpf"
                inputMode="numeric"
                placeholder="000.000.000-00"
                error={errors.cpf?.message}
                {...field}
                onChange={(event) =>
                  field.onChange(maskCpf(event.target.value))
                }
              />
            )}
          />
          <Heading level="h2">Endereço</Heading>
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
            <Controller
              control={control}
              name="postalCode"
              render={({ field }) => (
                <Field
                  label="CEP"
                  id="billing-postal-code"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000-000"
                  hint="Preenche o endereço."
                  error={errors.postalCode?.message}
                  {...field}
                  onChange={(event) =>
                    field.onChange(maskPostalCode(event.target.value))
                  }
                />
              )}
            />
            <Field
              label="Endereço"
              id="billing-street"
              autoComplete="address-line1"
              placeholder="Rua, avenida"
              error={errors.street?.message}
              {...register("street")}
            />
          </div>
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
            <Field
              label="Número"
              id="billing-number"
              placeholder="000"
              error={errors.number?.message}
              {...register("number")}
            />
            <Field
              label="Complemento"
              id="billing-complement"
              autoComplete="address-line2"
              placeholder="Apto, sala"
              hint="Opcional."
              error={errors.complement?.message}
              {...register("complement")}
            />
          </div>
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            <Field
              label="Bairro"
              id="billing-district"
              placeholder="Bairro"
              error={errors.district?.message}
              {...register("district")}
            />
            <Field
              label="Cidade"
              id="billing-city"
              autoComplete="address-level2"
              placeholder="Salvador"
              error={errors.city?.message}
              {...register("city")}
            />
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <Field
                  label="Estado"
                  id="billing-state"
                  autoComplete="address-level1"
                  placeholder="UF"
                  error={errors.state?.message}
                  {...field}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value
                        .replace(/[^A-Za-z]/g, "")
                        .toUpperCase()
                        .slice(0, 2),
                    )
                  }
                />
              )}
            />
          </div>
          <ActionRow divided>
            <TextLink to="/credits">← Trocar pacote</TextLink>
            <Button type="submit" disabled={isSubmitting || !selectedPackage}>
              Ir para o pagamento
            </Button>
          </ActionRow>
        </Card>
        <Card asChild>
          <aside>
            <Heading level="h2">Resumo</Heading>
            {selectedPackage ? (
              <OrderSummary
                name={selectedPackage.name}
                creditCount={selectedPackage.creditCount}
                pricePerCreditCents={selectedPackage.pricePerCreditCents}
                totalCents={selectedPackage.totalCents}
              />
            ) : (
              <Text muted>Escolha um pacote.</Text>
            )}
            <Hint>
              Telefone e endereço são usados só para o faturamento e ficam no
              serviço de pagamentos, separado do cadastro.
            </Hint>
          </aside>
        </Card>
      </form>
    </>
  );
}

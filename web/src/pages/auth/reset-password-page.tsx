import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Path } from "react-hook-form";
import { useSearchParams } from "react-router";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ActionRow } from "@/components/ui/action-row";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { useResetPassword } from "@/hooks/auth/use-reset-password";
import { applyApiError } from "@/lib/api-error";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "./reset-password-schema";

const fieldsByCode: Partial<Record<string, Path<ResetPasswordValues>>> = {
  password_too_short: "password",
  password_mismatch: "passwordConfirmation",
};

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const reset = useResetPassword();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", passwordConfirmation: "" },
  });

  function onSubmit(values: ResetPasswordValues) {
    reset.mutate(
      { token, ...values },
      { onError: (error) => applyApiError(error, setError, fieldsByCode) },
    );
  }

  if (!token) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-[420px]">
          <Heading>Nova senha</Heading>
          <Alert>Link inválido ou expirado.</Alert>
          <ActionRow>
            <TextLink to="/login">Voltar ao login</TextLink>
            <TextLink to="/forgot-password">Pedir novo link</TextLink>
          </ActionRow>
        </Card>
      </AuthLayout>
    );
  }

  if (reset.isSuccess) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-[420px]">
          <Heading>Senha redefinida</Heading>
          <Text muted>Entre com a nova senha.</Text>
          <TextLink to="/login">Voltar ao login</TextLink>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Card asChild className="w-full max-w-[420px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Heading>Nova senha</Heading>
          {errors.root ? <Alert>{errors.root.message}</Alert> : null}
          <Field
            label="Senha"
            id="new-password"
            type="password"
            autoComplete="new-password"
            hint="Mínimo de 8 caracteres."
            error={errors.password?.message}
            {...register("password")}
          />
          <Field
            label="Confirmar senha"
            id="new-password-confirmation"
            type="password"
            autoComplete="new-password"
            error={errors.passwordConfirmation?.message}
            {...register("passwordConfirmation")}
          />
          <ActionRow>
            <TextLink to="/login">Voltar ao login</TextLink>
            <Button type="submit" disabled={reset.isPending}>
              Salvar senha
            </Button>
          </ActionRow>
        </form>
      </Card>
    </AuthLayout>
  );
}

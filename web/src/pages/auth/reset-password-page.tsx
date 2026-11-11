import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { resetPassword } from "@/services/auth";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "./reset-password-schema";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", passwordConfirmation: "" },
  });

  async function onSubmit({ password }: ResetPasswordValues) {
    try {
      await resetPassword({ token, password });
      setDone(true);
    } catch (caught) {
      setError("root", {
        message:
          caught instanceof Error
            ? caught.message
            : "Não foi possível redefinir a senha.",
      });
    }
  }

  if (!token) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-[420px]">
          <Heading>Nova senha</Heading>
          <Alert>Link inválido ou expirado.</Alert>
          <div className="flex items-center justify-between gap-4">
            <TextLink to="/login">Voltar ao login</TextLink>
            <TextLink to="/forgot-password">Pedir novo link</TextLink>
          </div>
        </Card>
      </AuthLayout>
    );
  }

  if (done) {
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
          <div className="flex items-center justify-between gap-4">
            <TextLink to="/login">Voltar ao login</TextLink>
            <Button type="submit" disabled={isSubmitting}>
              Salvar senha
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}

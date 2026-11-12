import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ActionRow } from "@/components/ui/action-row";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Hint } from "@/components/ui/hint";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { useRequestPasswordReset } from "@/hooks/auth/use-request-password-reset";
import { applyApiError, errorMessage } from "@/lib/api-error";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "./forgot-password-schema";

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const request = useRequestPasswordReset();
  const resendRequest = useRequestPasswordReset();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit({ email }: ForgotPasswordValues) {
    request.mutate(
      { email },
      {
        onSuccess: () => setSentTo(email),
        onError: (error) => applyApiError(error, setError),
      },
    );
  }

  function resend() {
    if (!sentTo) return;
    resendRequest.mutate({ email: sentTo });
  }

  return (
    <AuthLayout>
      {sentTo ? (
        <Card className="w-full max-w-[420px]">
          <Heading>Verifique seu e-mail</Heading>
          <Text muted>
            Se houver uma conta com este e-mail, você receberá o link em alguns
            minutos.
          </Text>
          {resendRequest.isError ? (
            <Alert>{errorMessage(resendRequest.error)}</Alert>
          ) : null}
          <Hint>
            Por segurança, a mensagem é a mesma quando o e-mail não está
            cadastrado. O link expira após o primeiro uso.
          </Hint>
          <ActionRow>
            <TextLink to="/login">Voltar ao login</TextLink>
            <Button
              variant="outline"
              onClick={resend}
              disabled={resendRequest.isPending}
            >
              Reenviar link
            </Button>
          </ActionRow>
        </Card>
      ) : (
        <Card asChild className="w-full max-w-[420px]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Heading>Recuperar senha</Heading>
            <Text muted>
              Informe o e-mail cadastrado. Enviaremos um link de uso único,
              válido por 30 minutos.
            </Text>
            {errors.root ? <Alert>{errors.root.message}</Alert> : null}
            <Field
              label="E-mail cadastrado"
              id="recovery-email"
              type="email"
              autoComplete="email"
              placeholder="nome@exemplo.com.br"
              error={errors.email?.message}
              {...register("email")}
            />
            <ActionRow>
              <TextLink to="/login">Voltar ao login</TextLink>
              <Button type="submit" disabled={request.isPending}>
                Enviar link
              </Button>
            </ActionRow>
          </form>
        </Card>
      )}
    </AuthLayout>
  );
}

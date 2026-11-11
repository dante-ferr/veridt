import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Hint } from "@/components/ui/hint";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { requestPasswordReset } from "@/services/auth";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "./forgot-password-schema";

function errorMessage(caught: unknown) {
  return caught instanceof Error
    ? caught.message
    : "Não foi possível enviar o link.";
}

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [resendError, setResendError] = useState("");
  const [resending, setResending] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit({ email }: ForgotPasswordValues) {
    try {
      await requestPasswordReset(email);
      setSentTo(email);
    } catch (caught) {
      setError("root", { message: errorMessage(caught) });
    }
  }

  async function resend() {
    if (!sentTo) return;
    setResendError("");
    setResending(true);
    try {
      await requestPasswordReset(sentTo);
    } catch (caught) {
      setResendError(errorMessage(caught));
    } finally {
      setResending(false);
    }
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
          {resendError ? <Alert>{resendError}</Alert> : null}
          <Hint>
            Por segurança, a mensagem é a mesma quando o e-mail não está
            cadastrado. O link expira após o primeiro uso.
          </Hint>
          <div className="flex items-center justify-between gap-4">
            <TextLink to="/login">Voltar ao login</TextLink>
            <Button variant="outline" onClick={resend} disabled={resending}>
              Reenviar link
            </Button>
          </div>
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
            <div className="flex items-center justify-between gap-4">
              <TextLink to="/login">Voltar ao login</TextLink>
              <Button type="submit" disabled={isSubmitting}>
                Enviar link
              </Button>
            </div>
          </form>
        </Card>
      )}
    </AuthLayout>
  );
}

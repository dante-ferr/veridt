import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
import { signIn } from "@/services/auth";
import { loginSchema, type LoginValues } from "./login-schema";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    try {
      await signIn(values);
      navigate("/records");
    } catch (caught) {
      setError("root", {
        message:
          caught instanceof Error ? caught.message : "Não foi possível entrar.",
      });
    }
  }

  return (
    <AuthLayout>
      <Text muted className="text-center">
        Registro de evidências digitais com hash, data e hora verificáveis.
      </Text>
      <Card asChild className="w-full max-w-[420px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Heading>Entrar</Heading>
          {errors.root ? <Alert>{errors.root.message}</Alert> : null}
          <Field
            label="E-mail"
            id="email"
            type="email"
            autoComplete="username"
            placeholder="nome@exemplo.com.br"
            error={errors.email?.message}
            {...register("email")}
          />
          <Field
            label="Senha"
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <ActionRow>
            <TextLink to="/forgot-password">Esqueci minha senha</TextLink>
            <Button type="submit" disabled={isSubmitting}>
              Entrar
            </Button>
          </ActionRow>
          <Hint>
            Após 5 tentativas sem sucesso, o acesso fica bloqueado por alguns
            minutos.
          </Hint>
        </form>
      </Card>
      <Text className="flex gap-1">
        Ainda não tem conta?
        <TextLink size="md" to="/register">
          Cadastre-se
        </TextLink>
      </Text>
    </AuthLayout>
  );
}

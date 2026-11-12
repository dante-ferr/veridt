import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { useConfirmEmail } from "@/hooks/auth/use-confirm-email";
import { errorMessage } from "@/lib/api-error";

export default function ConfirmEmailPage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const confirmation = useConfirmEmail();
  const { mutate } = confirmation;
  const fired = useRef(false);

  useEffect(() => {
    if (!token || fired.current) return;
    fired.current = true;
    mutate({ token });
  }, [token, mutate]);

  if (confirmation.isSuccess) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-[420px]">
          <Heading>E-mail confirmado</Heading>
          <Text muted>
            Sua conta está pronta. Entre com o e-mail e a senha.
          </Text>
          <TextLink to="/login">Ir para o login</TextLink>
        </Card>
      </AuthLayout>
    );
  }

  if (!token || confirmation.isError) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-[420px]">
          <Heading>Confirmar e-mail</Heading>
          <Alert>
            {token
              ? errorMessage(confirmation.error)
              : "Link inválido ou expirado."}
          </Alert>
          <TextLink to="/login">Ir para o login</TextLink>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-[420px]">
        <Heading>Confirmando e-mail</Heading>
        <Text muted>Aguarde um instante.</Text>
      </Card>
    </AuthLayout>
  );
}

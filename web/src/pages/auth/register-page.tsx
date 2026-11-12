import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ActionRow } from "@/components/ui/action-row";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Hint } from "@/components/ui/hint";
import { Label } from "@/components/ui/label";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { maskCpf, onlyDigits } from "@/lib/masks";
import { register as registerAccount, type Profile } from "@/services/auth";
import { registerSchema, type RegisterValues } from "./register-schema";

export default function RegisterPage() {
  const [done, setDone] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      profile: "lawyer",
      fullName: "",
      email: "",
      cpf: "",
      oab: "",
      password: "",
      passwordConfirmation: "",
      acceptedTerms: false,
    },
  });
  const profile = useWatch({ control, name: "profile" });

  async function onSubmit(values: RegisterValues) {
    try {
      await registerAccount({
        profile: values.profile,
        fullName: values.fullName,
        email: values.email,
        cpf: onlyDigits(values.cpf),
        oab: values.profile === "lawyer" ? values.oab.toUpperCase() : undefined,
        password: values.password,
        acceptedTerms: values.acceptedTerms,
      });
      setDone(true);
    } catch (caught) {
      setError("root", {
        message:
          caught instanceof Error
            ? caught.message
            : "Não foi possível criar a conta.",
      });
    }
  }

  return (
    <AuthLayout>
      {done ? (
        <Card className="w-full max-w-[560px]">
          <Heading size="page">Conta criada</Heading>
          <Text muted>
            Sua conta está pronta. Entre com o e-mail e a senha.
          </Text>
          <TextLink to="/login">Ir para o login</TextLink>
        </Card>
      ) : (
        <Card asChild className="w-full max-w-[560px]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Heading size="page">Criar conta</Heading>
            {errors.root ? <Alert>{errors.root.message}</Alert> : null}
            <div className="flex flex-col gap-4">
              <Label id="profile-label">Tipo de conta</Label>
              <Controller
                control={control}
                name="profile"
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="profile-label"
                    className="grid-cols-1 items-start sm:grid-cols-2"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value as Profile)}
                  >
                    <RadioCard
                      value="lawyer"
                      title="Advogado"
                      description="Informe o número da OAB."
                    />
                    <RadioCard
                      value="common_user"
                      title="Usuário comum"
                      description="Pessoa física, sem OAB."
                    />
                  </RadioGroup>
                )}
              />
            </div>
            <Field
              label="Nome completo"
              id="full-name"
              autoComplete="name"
              placeholder="Ana Ribeiro"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <Field
              label="E-mail"
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="nome@exemplo.com.br"
              error={errors.email?.message}
              {...register("email")}
            />
            <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
              <Controller
                control={control}
                name="cpf"
                render={({ field }) => (
                  <Field
                    label="CPF"
                    id="cpf"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    hint="Somente números."
                    error={errors.cpf?.message}
                    {...field}
                    onChange={(event) =>
                      field.onChange(maskCpf(event.target.value))
                    }
                  />
                )}
              />
              {profile === "lawyer" ? (
                <Field
                  label="Número da OAB"
                  id="oab"
                  placeholder="UF 000000"
                  error={errors.oab?.message}
                  {...register("oab")}
                />
              ) : null}
            </div>
            <Field
              label="Senha"
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              hint="Mínimo de 8 caracteres."
              error={errors.password?.message}
              {...register("password")}
            />
            <Field
              label="Confirmar senha"
              id="register-password-confirmation"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              error={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
            />
            <div className="flex flex-col gap-1">
              <Controller
                control={control}
                name="acceptedTerms"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accepted-terms"
                      ref={field.ref}
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      onBlur={field.onBlur}
                      aria-invalid={errors.acceptedTerms ? true : undefined}
                      aria-describedby={
                        errors.acceptedTerms
                          ? "accepted-terms-error"
                          : undefined
                      }
                    />
                    <Label htmlFor="accepted-terms" className="cursor-pointer">
                      Li e aceito os termos de uso e a política de privacidade.
                    </Label>
                  </div>
                )}
              />
              {errors.acceptedTerms ? (
                <p
                  id="accepted-terms-error"
                  role="alert"
                  className="text-xs leading-4 text-fail"
                >
                  {errors.acceptedTerms.message}
                </p>
              ) : null}
            </div>
            <ActionRow>
              <TextLink to="/login">Já tenho conta</TextLink>
              <Button type="submit" disabled={isSubmitting}>
                Criar conta
              </Button>
            </ActionRow>
          </form>
        </Card>
      )}
      <Hint className="text-center">
        Empresas poderão se cadastrar em uma próxima versão. Telefone e endereço
        são pedidos apenas na compra de créditos.
      </Hint>
    </AuthLayout>
  );
}

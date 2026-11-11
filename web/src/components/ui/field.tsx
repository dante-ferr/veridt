import * as React from "react";
import { cn } from "cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldProps = React.ComponentProps<typeof Input> & {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  containerClassName?: string;
};

function Field({
  label,
  hint,
  error,
  id,
  containerClassName,
  ...inputProps
}: FieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy =
    [hintId, errorId, inputProps["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div
      data-slot="field"
      className={cn("flex flex-col gap-1", containerClassName)}
    >
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        {...inputProps}
        id={inputId}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
        aria-describedby={describedBy}
      />
      {hint ? (
        <p id={hintId} className="text-xs leading-4 text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs leading-4 text-fail">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { Field };

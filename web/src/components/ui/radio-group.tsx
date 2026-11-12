import * as React from "react";
import { cn } from "cn";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "size-4 shrink-0 cursor-pointer rounded-full border border-ink-muted bg-surface outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[5px] data-[state=checked]:border-seal",
        className,
      )}
      {...props}
    />
  );
}

type RadioCardProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  title: React.ReactNode;
  description?: React.ReactNode;
};

function RadioCard({
  title,
  description,
  className,
  id,
  ...props
}: RadioCardProps) {
  const generatedId = React.useId();
  const itemId = id ?? generatedId;

  return (
    <label
      htmlFor={itemId}
      data-slot="radio-card"
      className={cn(
        "flex cursor-pointer items-start gap-2 rounded border border-ink-muted bg-surface p-4 has-data-[state=checked]:border-2 has-data-[state=checked]:border-seal has-data-[state=checked]:bg-seal-tint",
        className,
      )}
    >
      <RadioGroupItem
        id={itemId}
        className="mt-[3px]"
        aria-labelledby={`${itemId}-title`}
        aria-describedby={description ? `${itemId}-description` : undefined}
        {...props}
      />
      <span className="flex flex-col gap-1">
        <span
          id={`${itemId}-title`}
          className="text-[15px] leading-[22px] font-medium text-ink"
        >
          {title}
        </span>
        {description ? (
          <span
            id={`${itemId}-description`}
            className="text-xs leading-4 text-ink-muted"
          >
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export { RadioGroup, RadioGroupItem, RadioCard };

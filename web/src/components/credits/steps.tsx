import { cn } from "cn";

const steps = ["Pacote", "Faturamento", "Pagamento"] as const;

function Steps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex flex-wrap gap-4 text-[13px] leading-[18px] font-medium">
      {steps.map((name, index) => {
        const number = index + 1;
        const done = number < current;
        const here = number === current;

        return (
          <li
            key={name}
            aria-current={here ? "step" : undefined}
            className={cn(
              here && "text-seal",
              done && "text-ok",
              !here && !done && "text-ink-muted",
            )}
          >
            {number}. {name}
            {done ? " ✓" : ""}
          </li>
        );
      })}
    </ol>
  );
}

export { Steps };

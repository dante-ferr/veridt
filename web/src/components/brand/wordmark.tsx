import { cn } from "cn";

function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block text-[32px] leading-10 font-semibold text-ink",
        className,
      )}
    >
      Veridt
    </span>
  );
}

export { Wordmark };

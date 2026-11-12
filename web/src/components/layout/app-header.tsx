import { Link } from "react-router";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";

const navigation = [
  { to: "/records", label: "Registros" },
  { to: "/records/new", label: "Novo registro" },
  { to: "/credits", label: "Créditos" },
  { to: "/account", label: "Minha conta" },
];

type AppHeaderProps = {
  userName: string;
  balance: number;
  onSignOut: () => void;
};

function AppHeader({ userName, balance, onSignOut }: AppHeaderProps) {
  return (
    <header className="flex flex-col items-start gap-4 bg-surface px-6 py-4 shadow-[inset_0_-1px_0_var(--line)] md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="flex flex-wrap items-center gap-6">
        <Link
          to="/records"
          className="outline-none focus-visible:outline-2 focus-visible:outline-seal"
        >
          <Wordmark className="text-xl leading-7" />
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap gap-4">
          {navigation.map((item) => (
            <TextLink key={item.to} to={item.to} size="md">
              {item.label}
            </TextLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-[13px] leading-[18px] text-ink-muted">
          Saldo {balance} créditos
        </span>
        <span className="text-[15px] leading-[22px] text-ink">{userName}</span>
        <Button variant="outline" onClick={onSignOut}>
          Sair
        </Button>
      </div>
    </header>
  );
}

export { AppHeader };

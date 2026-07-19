import Link from "next/link";
import { ListChecks } from "lucide-react";

export function AuthLogo() {
  return (
    <Link
      href="/"
      className="mb-6 flex items-center gap-2 font-semibold transition-opacity hover:opacity-80"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ListChecks className="size-4" />
      </span>
      TaskFlow
    </Link>
  );
}

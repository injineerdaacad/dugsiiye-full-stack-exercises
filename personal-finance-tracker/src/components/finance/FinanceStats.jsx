import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";

function money(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function FinanceStats({ monthly, transactions = [], activeFilter = "all", onFilterChange }) {
  const stats = [
    {
      label: "Total",
      value: transactions.length,
      icon: Wallet,
      className: "text-slate-900",
      iconClassName: "bg-sky-50 text-sky-600",
      filter: "all",
    },
    {
      label: "Income",
      value: money(monthly?.totals?.totalIncome),
      icon: TrendingUp,
      className: "text-green-600",
      iconClassName: "bg-emerald-50 text-emerald-600",
      filter: "income",
    },
    {
      label: "Expense",
      value: money(monthly?.totals?.totalExpense),
      icon: TrendingDown,
      className: "text-red-600",
      iconClassName: "bg-rose-50 text-rose-600",
      filter: "expense",
    },
    {
      label: "Net",
      value: money(monthly?.totals?.netIncome),
      icon: DollarSign,
      className: "text-sky-600",
      iconClassName: "bg-sky-50 text-sky-600",
      filter: "net",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        const isActive = activeFilter === item.filter;

        return (
          <Card
            key={item.label}
            as="button"
            type="button"
            onClick={() => onFilterChange?.(item.filter)}
            className={cn(
              "w-full cursor-pointer gap-5 border-sky-100/80 bg-white/95 p-5 text-left transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_44px_rgba(14,165,233,0.12)] active:translate-y-0",
              isActive && "border-sky-300 bg-sky-50/80 shadow-[0_18px_44px_rgba(14,165,233,0.12)]"
            )}
            aria-pressed={isActive}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconClassName}`}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className={`text-3xl font-bold tracking-tight ${item.className}`}>{item.value}</p>
          </Card>
        );
      })}
    </div>
  );
}

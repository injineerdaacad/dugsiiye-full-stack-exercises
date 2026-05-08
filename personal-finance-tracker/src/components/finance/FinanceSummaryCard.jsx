import { Card, CardContent } from "@/components/ui/Card";

export const summaryPeriods = [
  { label: "Today", value: "today", description: "Totals grouped by category for today." },
  { label: "Week", value: "week", description: "Totals grouped by category for this week." },
  { label: "Month", value: "month", description: "Totals grouped by category for this month." },
  { label: "Year", value: "year", description: "Totals grouped by category for this year." },
  { label: "All", value: "all", description: "Totals grouped by category for all Transactions." },
];

function money(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function capitalize(value = "") {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isTransactionInPeriod(transactionDate, period) {
  if (period === "all") return true;

  const now = new Date();
  const date = startOfDay(new Date(transactionDate));
  const today = startOfDay(now);

  if (period === "today") {
    return date.getTime() === today.getTime();
  }

  if (period === "week") {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return date >= start && date <= end;
  }

  if (period === "month") {
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }

  if (period === "year") {
    return date.getFullYear() === now.getFullYear();
  }

  return true;
}

export function buildSummary(transactions, period) {
  const groups = new Map();

  transactions
    .filter((transaction) => isTransactionInPeriod(transaction.date, period))
    .forEach((transaction) => {
      const key = `${transaction.type}-${transaction.category}`;
      const current = groups.get(key) || {
        category: transaction.category,
        type: transaction.type,
        transactionCount: 0,
        totalAmount: 0,
      };

      groups.set(key, {
        ...current,
        transactionCount: current.transactionCount + 1,
        totalAmount: current.totalAmount + Number(transaction.amount || 0),
      });
    });

  return Array.from(groups.values()).sort((a, b) => b.totalAmount - a.totalAmount);
}

export default function FinanceSummaryCard({ activePeriod, items, onPeriodChange }) {
  const activeSummaryPeriod = summaryPeriods.find((period) => period.value === activePeriod) || summaryPeriods[2];

  return (
    <Card className="border-sky-100/80 bg-white/95">
      <CardContent className="space-y-3">
        <div className="grid grid-cols-5 gap-2 rounded-lg bg-sky-50 p-1">
          {summaryPeriods.map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => onPeriodChange(period.value)}
              className={`h-9 cursor-pointer rounded-md px-2 text-sm font-medium transition hover:bg-white hover:text-sky-700 ${
                activePeriod === period.value ? "bg-white text-sky-700 shadow-sm" : "text-slate-500"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-sky-200 bg-sky-50/60 p-6 text-center text-sm text-muted-foreground">
            No Transactions found for {activeSummaryPeriod.label.toLowerCase()}.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={`${item.type}-${item.category}`}
              className="flex items-center justify-between rounded-lg border border-sky-100 bg-slate-50/70 p-3"
            >
              <div>
                <p className="font-medium">{item.category}</p>
                <p className="text-sm text-muted-foreground">
                  {item.transactionCount} Transactions - {capitalize(item.type)}
                </p>
              </div>
              <strong className={item.type === "income" ? "text-emerald-600" : "text-rose-600"}>
                {money(item.totalAmount)}
              </strong>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

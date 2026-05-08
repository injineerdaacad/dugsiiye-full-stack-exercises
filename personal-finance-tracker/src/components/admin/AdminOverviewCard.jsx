import { Card, CardContent } from "@/components/ui/Card";

function money(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function AdminOverviewCard({ overview }) {
  return (
    <Card className="border-sky-100/80 bg-white/95">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-sky-100 bg-slate-50/70 p-3">
          <span>Total Users</span>
          <strong>{overview?.totalUsers ?? 0}</strong>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-sky-100 bg-slate-50/70 p-3">
          <span>Total Transactions</span>
          <strong>{overview?.totalTransactions ?? 0}</strong>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-sky-100 bg-slate-50/70 p-3">
          <span>System Net</span>
          <strong>{money(overview?.netIncome)}</strong>
        </div>
      </CardContent>
    </Card>
  );
}

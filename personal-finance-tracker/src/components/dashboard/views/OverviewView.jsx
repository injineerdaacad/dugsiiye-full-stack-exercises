import AdminOverviewCard from "@/components/admin/AdminOverviewCard";
import FinanceStats from "@/components/finance/FinanceStats";
import FinanceSummaryCard from "@/components/finance/FinanceSummaryCard";

export default function OverviewView({
  isAdmin,
  monthly,
  transactions,
  transactionFilter,
  summaryPeriod,
  summaryItems,
  adminOverview,
  onFilterChange,
  onPeriodChange,
}) {
  return (
    <>
      <FinanceStats
        monthly={monthly}
        transactions={transactions}
        activeFilter={transactionFilter}
        onFilterChange={onFilterChange}
      />
      <section className={`grid gap-6 ${isAdmin ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        <FinanceSummaryCard
          activePeriod={summaryPeriod}
          items={summaryItems}
          onPeriodChange={onPeriodChange}
        />
        {isAdmin && <AdminOverviewCard overview={adminOverview} />}
      </section>
    </>
  );
}

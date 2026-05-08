import FinanceSummaryCard from "@/components/finance/FinanceSummaryCard";

export default function ReportsView({ summaryPeriod, summaryItems, onPeriodChange }) {
  return (
    <FinanceSummaryCard
      activePeriod={summaryPeriod}
      items={summaryItems}
      onPeriodChange={onPeriodChange}
    />
  );
}

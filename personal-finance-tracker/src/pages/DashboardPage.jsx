import { Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import { pageDetails } from "@/components/dashboard/sidebar/navigationItems";
import AdminOverviewView from "@/components/dashboard/views/AdminOverviewView";
import OverviewView from "@/components/dashboard/views/OverviewView";
import PageHeader from "@/components/dashboard/views/PageHeader";
import ReportsView from "@/components/dashboard/views/ReportsView";
import TransactionsView from "@/components/dashboard/views/TransactionsView";
import UsersView from "@/components/dashboard/views/UsersView";
import { buildSummary } from "@/components/finance/FinanceSummaryCard";
import { useAuth } from "@/hooks/useAuth";
import { useFinance } from "@/hooks/useFinance";

export default function DashboardPage() {
  const { user } = useAuth();
  const finance = useFinance(user);
  const categories = finance.categoriesQuery.data || [];
  const transactions = finance.transactionsQuery.data || [];
  const monthly = finance.monthlySummaryQuery.data;
  const adminOverview = finance.adminOverviewQuery.data;
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [summaryPeriod, setSummaryPeriod] = useState("month");
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isAdmin = user?.role === "admin";
  const summaryItems = useMemo(
    () => buildSummary(transactions, summaryPeriod),
    [transactions, summaryPeriod]
  );
  const activePage = pageDetails[activeSection] || pageDetails.overview;

  useEffect(() => {
    if (!isAdmin && (activeSection === "admin-overview" || activeSection === "users")) {
      setActiveSection("overview");
    }
  }, [activeSection, isAdmin]);

  if (finance.transactionsQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (finance.transactionsQuery.isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error loading transactions: {finance.transactionsQuery.error.message}</p>
      </div>
    );
  }

  function renderActiveView() {
    if (activeSection === "transactions") {
      return (
        <TransactionsView
          categories={categories}
          transactions={transactions}
          transactionFilter={transactionFilter}
          onTypeFilterChange={setTransactionFilter}
          createTransactionMutation={finance.createTransactionMutation}
          updateTransactionMutation={finance.updateTransactionMutation}
          deleteTransactionMutation={finance.deleteTransactionMutation}
        />
      );
    }

    if (activeSection === "reports") {
      return (
        <ReportsView
          summaryPeriod={summaryPeriod}
          summaryItems={summaryItems}
          onPeriodChange={setSummaryPeriod}
        />
      );
    }

    if (activeSection === "admin-overview" && isAdmin) {
      return <AdminOverviewView adminOverview={adminOverview} />;
    }

    if (activeSection === "users" && isAdmin) {
      return (
        <UsersView
          currentUser={user}
          users={finance.usersQuery.data || []}
          usersQuery={finance.usersQuery}
          createUserMutation={finance.createUserMutation}
          updateUserMutation={finance.updateUserMutation}
          deleteUserMutation={finance.deleteUserMutation}
        />
      );
    }

    return (
      <OverviewView
        isAdmin={isAdmin}
        monthly={monthly}
        transactions={transactions}
        transactionFilter={transactionFilter}
        summaryPeriod={summaryPeriod}
        summaryItems={summaryItems}
        adminOverview={adminOverview}
        onFilterChange={(filter) => {
          setTransactionFilter(filter);
          setActiveSection("transactions");
        }}
        onPeriodChange={setSummaryPeriod}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader
        user={user}
        uploadMutation={finance.uploadProfilePictureMutation}
        onDashboardClick={() => setActiveSection("overview")}
      />

      <main className="w-full px-4 py-4 lg:px-6">
        <div className={`grid gap-4 ${isSidebarCollapsed ? "lg:grid-cols-[4.75rem_1fr]" : "lg:grid-cols-[16.5rem_1fr]"}`}>
          <DashboardSidebar
            activeItem={activeSection}
            isAdmin={isAdmin}
            isCollapsed={isSidebarCollapsed}
            onSelect={setActiveSection}
            onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
          />

          <section className="min-w-0 space-y-4">
            <PageHeader title={activePage.title} description={activePage.description} />
            {renderActiveView()}
          </section>
        </div>
      </main>
    </div>
  );
}

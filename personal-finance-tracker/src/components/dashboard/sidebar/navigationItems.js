import { BarChart3, LayoutDashboard, ShieldCheck, Users, WalletCards } from "lucide-react";

export const navigationGroups = [
  {
    title: "Finance",
    code: "FIN",
    items: [
      {
        id: "overview",
        label: "Overview",
        description: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "transactions",
        label: "Transactions",
        description: "Income and expenses",
        icon: WalletCards,
      },
      {
        id: "reports",
        label: "Reports",
        description: "Finance summary",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Administration",
    code: "ADM",
    adminOnly: true,
    items: [
      {
        id: "admin-overview",
        label: "Admin Overview",
        description: "System metrics",
        icon: ShieldCheck,
      },
      {
        id: "users",
        label: "Users",
        description: "Role and access",
        icon: Users,
      },
    ],
  },
];

export const pageDetails = {
  overview: {
    title: "Overview",
    description: "Monitor balances, activity, and the current finance position.",
  },
  transactions: {
    title: "Transactions",
    description: "Search, create, and manage income and expense records.",
  },
  reports: {
    title: "Reports",
    description: "Review finance totals by category and period.",
  },
  "admin-overview": {
    title: "Admin Overview",
    description: "Track system-level user and finance metrics.",
  },
  users: {
    title: "Users",
    description: "Create accounts, change roles, and manage account status.",
  },
};

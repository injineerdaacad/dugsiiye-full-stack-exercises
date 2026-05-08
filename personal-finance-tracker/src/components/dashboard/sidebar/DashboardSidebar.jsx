import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { navigationGroups } from "./navigationItems";
import SidebarSection from "./SidebarSection";

export default function DashboardSidebar({ activeItem, isAdmin, isCollapsed, onSelect, onToggleCollapse }) {
  const visibleGroups = navigationGroups.filter((group) => !group.adminOnly || isAdmin);
  const ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside className="h-fit border border-slate-200 bg-white shadow-sm lg:sticky lg:top-[73px] lg:min-h-[calc(100vh-73px)]">
      <div className={`flex items-center border-b border-slate-200 px-3 py-3 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Main Menu</p>}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"
          title={isCollapsed ? "Expand menu" : "Collapse menu"}
          aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
        >
          <ToggleIcon className="size-4" />
        </button>
      </div>
      <nav>
        {visibleGroups.map((group) => (
          <SidebarSection
            key={group.title}
            group={group}
            activeItem={activeItem}
            isCollapsed={isCollapsed}
            onSelect={onSelect}
          />
        ))}
      </nav>
    </aside>
  );
}

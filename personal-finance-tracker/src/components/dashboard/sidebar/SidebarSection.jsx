import SidebarLink from "./SidebarLink";

export default function SidebarSection({ group, activeItem, isCollapsed, onSelect }) {
  return (
    <section className="border-b border-slate-200/80 py-3 last:border-b-0">
      <div className={`mb-2 flex items-center px-3 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{group.title}</p>}
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">{group.code}</span>
      </div>
      <div className={`space-y-0.5 ${isCollapsed ? "px-2" : "pl-2"}`}>
        {group.items.map((item) => (
          <SidebarLink
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            isCollapsed={isCollapsed}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

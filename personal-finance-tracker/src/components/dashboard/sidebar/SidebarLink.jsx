export default function SidebarLink({ item, isActive, isCollapsed, onSelect }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      title={isCollapsed ? `${item.label} - ${item.description}` : undefined}
      className={`group relative flex h-9 w-full cursor-pointer items-center rounded-md text-sm transition hover:bg-slate-100 ${
        isCollapsed ? "justify-center px-0" : "gap-2.5 px-3 text-left"
      } ${
        isActive
          ? "bg-sky-50 font-semibold text-sky-700"
          : "font-medium text-slate-600"
      }`}
    >
      <span className={`absolute left-0 h-5 w-0.5 rounded-full ${isActive ? "bg-sky-500" : "bg-transparent"}`} />
      <Icon className={`size-4 shrink-0 ${isActive ? "text-sky-600" : "text-slate-400 group-hover:text-slate-600"}`} />
      {!isCollapsed && <span className="truncate">{item.label}</span>}
    </button>
  );
}

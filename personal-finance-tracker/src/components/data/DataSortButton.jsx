import { ArrowDown, ArrowUp } from "lucide-react";

export default function DataSortButton({ column, label, sort, onSort }) {
  const isActive = sort.key === column;
  const Icon = sort.direction === "asc" ? ArrowUp : ArrowDown;

  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className="inline-flex cursor-pointer items-center gap-1 font-semibold text-slate-700 hover:text-sky-700"
    >
      {label}
      {isActive && <Icon className="size-3.5" />}
    </button>
  );
}

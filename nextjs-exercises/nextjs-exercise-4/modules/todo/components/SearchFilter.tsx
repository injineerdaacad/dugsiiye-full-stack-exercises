"use client";

import { useRef } from "react";
import { useSearch, type FilterStatus } from "../hooks";

const STATUS_TABS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export function SearchFilter() {
  const { currentSearch, currentStatus, onSearchChange, onStatusChange, clearSearch } =
    useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Instant search */}
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3 text-slate-400 text-sm">🔍</span>
        <input
          ref={inputRef}
          type="search"
          defaultValue={currentSearch}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          className="w-64 rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {currentSearch && (
          <button
            type="button"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              clearSearch();
            }}
            className="absolute right-2.5 text-slate-400 hover:text-slate-600 transition-colors"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
        {STATUS_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onStatusChange(value)}
            className={[
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              currentStatus === value
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

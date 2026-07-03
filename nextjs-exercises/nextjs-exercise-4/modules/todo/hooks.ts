"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

// Search & Filter
export type FilterStatus = "all" | "completed" | "pending";

export function useSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSearch = params.get("q") ?? "";
  const currentStatus = (params.get("status") ?? "all") as FilterStatus;

  function pushParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    router.push(`/?${next.toString()}`);
  }

  function onSearchChange(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushParam("q", value.trim()), 300);
  }

  function onStatusChange(status: FilterStatus) {
    pushParam("status", status);
  }

  function clearSearch() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pushParam("q", "");
  }

  return { currentSearch, currentStatus, onSearchChange, onStatusChange, clearSearch };
}


// Bulk Select
export function useBulkSelect(allIds: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = allIds.length > 0 && selected.size === allIds.length;
  const someSelected = selected.size > 0;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(allIds));
  }

  function clear() {
    setSelected(new Set());
  }

  return {
    selected,
    allSelected,
    someSelected,
    selectedArray: Array.from(selected),
    toggle,
    toggleAll,
    clear,
  };
}

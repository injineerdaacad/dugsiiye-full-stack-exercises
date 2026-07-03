import Link from "next/link";
import { Suspense } from "react";
import { getTodos } from "@/modules/todo";
import { SearchFilter } from "@/modules/todo/components/SearchFilter";
import { TodoList } from "@/modules/todo/components/TodoList";

type PageProps = { searchParams: Promise<{ q?: string; status?: string }> };

export default async function HomePage({ searchParams }: PageProps) {
  const { q, status } = await searchParams;

  const todos = await getTodos({
    search: q,
    status: (status as "all" | "completed" | "pending") ?? "all",
  });

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Task Management</h1>
          <p className="mt-1 text-sm text-slate-500">ERP-style task management built with Next.js Server Actions</p>
        </div>
  
        <Link
          href="/new"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          + New Task
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{total}</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: "100%" }} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completed</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{completed}</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending</p>
          <p className="mt-2 text-3xl font-bold text-amber-600">{pending}</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full bg-amber-500"
              style={{ width: total > 0 ? `${Math.round((pending / total) * 100)}%` : "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Main panel */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <Suspense fallback={<div className="h-10 animate-pulse rounded-lg bg-slate-100" />}>
            <SearchFilter />
          </Suspense>
        </div>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

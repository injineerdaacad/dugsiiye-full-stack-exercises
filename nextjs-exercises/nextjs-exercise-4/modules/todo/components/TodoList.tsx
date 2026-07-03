"use client";

import Link from "next/link";
import { deleteTodoAction, toggleTodoAction, bulkDeleteAction, bulkCompleteAction } from "../actions";
import { TODO_ROUTES } from "../constants";
import { useBulkSelect } from "../hooks";
import type { Priority, Todo } from "../types";
import { TimeAgo } from "@/shared/components/TimeAgo";

const PRIORITY: Record<Priority, { label: string; className: string }> = {
  high: { label: "High", className: "bg-red-100 text-red-700" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700" },
  low: { label: "Low", className: "bg-slate-100 text-slate-500" },
};

export function TodoList({ todos }: { todos: Todo[] }) {
  const { selected, allSelected, someSelected, selectedArray, toggle, toggleAll, clear } =
    useBulkSelect(todos.map((t) => t._id));

  async function handleBulkDelete() {
    await bulkDeleteAction(selectedArray);
    clear();
  }

  async function handleBulkComplete(completed: boolean) {
    await bulkCompleteAction(selectedArray, completed);
    clear();
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
        <div className="mb-3 text-4xl">📭</div>
        <p className="text-sm font-semibold text-slate-600">No tasks found</p>
        <p className="mt-1 text-xs text-slate-400">Create a new task or adjust your filters</p>
      </div>
    );
  }

  return (
    <div>
      {/* Bulk toolbar */}
      {someSelected && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2.5">
          <span className="text-xs font-semibold text-indigo-700">
            {selected.size} selected
          </span>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => handleBulkComplete(true)}
              className="rounded-md border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              ✅ Mark Done
            </button>
            <button
              onClick={() => handleBulkComplete(false)}
              className="rounded-md border border-amber-200 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
            >
              ⬜ Mark Pending
            </button>
            <button
              onClick={handleBulkDelete}
              className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              🗑️ Delete
            </button>
            <button
              onClick={clear}
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table header */}
      <div className="mb-1 grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-slate-100 pb-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleAll}
          className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
          title="Select all"
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Task</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Priority</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Created</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</p>
      </div>

      {/* Rows */}
      {todos.map((todo) => {
        const p = PRIORITY[todo.priority] ?? PRIORITY.medium;
        return (
          <div
            key={todo._id}
            className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-slate-100 py-3 last:border-0"
          >
            <input
              type="checkbox"
              checked={selected.has(todo._id)}
              onChange={() => toggle(todo._id)}
              className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
            />

            <div className="flex items-center gap-2 min-w-0">
              <form action={toggleTodoAction.bind(null, todo._id)}>
                <button
                  type="submit"
                  title={todo.completed ? "Mark as pending" : "Mark as done"}
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    todo.completed
                      ? "border-emerald-500 bg-emerald-500 hover:bg-emerald-600"
                      : "border-slate-300 hover:border-indigo-400",
                  ].join(" ")}
                >
                  {todo.completed && (
                    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </form>

              <span className={todo.completed ? "truncate text-sm text-slate-400 line-through" : "truncate text-sm font-medium text-slate-800"}>
                {todo.title}
              </span>

              <span className={todo.completed
                ? "shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700"
                : "shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700"
              }>
                {todo.completed ? "Done" : "Pending"}
              </span>
            </div>

            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${p.className}`}>
              {p.label}
            </span>

            <TimeAgo date={todo.createdAt} />

            <div className="flex items-center gap-1 shrink-0">
              <Link
                href={TODO_ROUTES.edit(todo._id)}
                className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                ✏️ Edit
              </Link>
              <form action={deleteTodoAction.bind(null, todo._id)}>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  🗑️
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

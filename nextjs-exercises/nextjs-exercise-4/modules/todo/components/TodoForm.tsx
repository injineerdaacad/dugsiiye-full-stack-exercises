"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createTodoAction, updateTodoAction } from "../actions";
import { TODO_ROUTES } from "../constants";
import type { Priority, Todo } from "../types";

type TodoFormProps = {
  mode: "create" | "edit";
  todo?: Todo;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "text-slate-600" },
  { value: "medium", label: "Medium", color: "text-amber-600" },
  { value: "high", label: "High", color: "text-red-600" },
];

export function TodoForm({ mode, todo }: TodoFormProps) {
  const action = mode === "create" ? createTodoAction : updateTodoAction;
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6">
      {mode === "edit" && todo && (
        <input type="hidden" name="id" value={todo._id} />
      )}

      <div className="space-y-1.5">
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={todo?.title ?? ""}
          placeholder="e.g. Review Q3 financial report"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {state?.error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <span className="text-sm text-red-500">⚠</span>
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}
        <p className="text-xs text-slate-400">Maximum 200 characters</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700">Priority</p>
        <div className="flex gap-2">
          {PRIORITY_OPTIONS.map(({ value, label, color }) => (
            <label
              key={value}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:shadow-sm"
            >
              <input
                type="radio"
                name="priority"
                value={value}
                defaultChecked={todo ? todo.priority === value : value === "medium"}
                className="sr-only"
              />
              <span className={`font-semibold ${color}`}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving…
            </>
          ) : mode === "create" ? (
            "Create Task"
          ) : (
            "Save Changes"
          )}
        </button>
        <Link
          href={TODO_ROUTES.list}
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

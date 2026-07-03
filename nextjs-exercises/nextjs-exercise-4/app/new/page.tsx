import Link from "next/link";
import { TodoForm } from "@/modules/todo/components/TodoForm";

export default function NewTaskPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-slate-600 transition-colors">Tasks</Link>
        <span>›</span>
        <span className="text-slate-600 font-medium">New Task</span>
      </nav>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">Create New Task</h1>
          <p className="mt-1 text-sm text-slate-500">Add a new task to the system</p>
        </div>
        <TodoForm mode="create" />
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodoById } from "@/modules/todo";
import { TodoForm } from "@/modules/todo/components/TodoForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditTaskPage({ params }: PageProps) {
  const { id } = await params;
  const todo = await getTodoById(id);

  if (!todo) notFound();

  const lastUpdated = todo.updatedAt
    ? new Date(todo.updatedAt).toLocaleString()
    : "Never";

  const createdAt = new Date(todo.createdAt).toLocaleString();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-slate-600 transition-colors">Tasks</Link>
        <span>›</span>
        <span className="text-slate-600 font-medium">Edit Task</span>
      </nav>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">Edit Task</h1>
          <p className="mt-1 truncate text-sm text-slate-500">{todo.title}</p>
        </div>

        <TodoForm mode="edit" todo={todo} />

        {/* Metadata */}
        <div className="mt-6 border-t border-slate-100 pt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Created</p>
            <p className="mt-1 text-sm text-slate-600">{createdAt}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last Updated</p>
            <p className="mt-1 text-sm text-slate-600">{lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import type { Task } from "@/lib/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/dashboard/task-form";
import { useDeleteTask, useUpdateTask } from "@/app/dashboard/hooks";
import type { TaskInput } from "@/lib/validations";

const statusLabels: Record<Task["status"], string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

const statusStyles: Record<Task["status"], string> = {
  TODO: "border-transparent bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  IN_PROGRESS:
    "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  DONE: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
};

const statusAccent: Record<Task["status"], string> = {
  TODO: "before:bg-slate-300 dark:before:bg-slate-600",
  IN_PROGRESS: "before:bg-amber-400",
  DONE: "before:bg-emerald-500",
};

export function TaskItem({ task }: { task: Task }) {
  const [editing, setEditing] = useState(false);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  function handleUpdate(values: TaskInput) {
    updateTask.mutate(
      { id: task.id, input: values },
      { onSuccess: () => setEditing(false) },
    );
  }

  return (
    <Card
      className={`relative overflow-hidden pl-5 shadow-sm transition-shadow before:absolute before:inset-y-0 before:left-0 before:w-1 before:content-[''] hover:shadow-md ${statusAccent[task.status]}`}
    >
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          {task.title}
          <Badge className={statusStyles[task.status]}>
            {statusLabels[task.status]}
          </Badge>
        </CardTitle>
        {task.description && (
          <CardDescription>{task.description}</CardDescription>
        )}
        <CardAction className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setEditing(true)}
            aria-label="Edit task"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => deleteTask.mutate(task.id)}
            disabled={deleteTask.isPending}
            aria-label="Delete task"
          >
            <Trash2 className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <TaskForm
            defaultValues={{
              title: task.title,
              description: task.description ?? "",
              status: task.status,
            }}
            submitLabel="Save changes"
            submitting={updateTask.isPending}
            onSubmit={handleUpdate}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

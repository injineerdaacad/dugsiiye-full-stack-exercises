"use client";

import { ClipboardList } from "lucide-react";

import { useTasks, useCreateTask } from "@/app/dashboard/hooks";
import { TaskForm } from "@/components/dashboard/task-form";
import { TaskItem } from "@/components/dashboard/task-item";
import { AiSuggestions } from "@/components/dashboard/ai-suggestions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { TaskInput } from "@/lib/validations";

export function TaskBoard() {
  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();

  function handleCreate(values: TaskInput) {
    createTask.mutate(values);
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-[320px_1fr]">
      <Card className="h-fit shadow-sm">
        <CardHeader>
          <CardTitle>New task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm
            submitLabel="Add task"
            submitting={createTask.isPending}
            onSubmit={handleCreate}
          />
        </CardContent>
      </Card>

      <div className="space-y-5">
        <AiSuggestions existingTitles={tasks?.map((t) => t.title) ?? []} />

        {isLoading && (
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg border bg-card" />
            ))}
          </div>
        )}

        {tasks && tasks.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-14 text-center">
            <ClipboardList className="size-8 text-muted-foreground" />
            <p className="font-medium">No tasks yet</p>
            <p className="text-sm text-muted-foreground">
              Add your first task on the left, or ask AI for ideas.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {tasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

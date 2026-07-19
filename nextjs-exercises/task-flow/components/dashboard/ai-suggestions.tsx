"use client";

import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { toast } from "sonner";

import { suggestTasks } from "@/app/dashboard/ai-actions";
import { useCreateTask } from "@/app/dashboard/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Suggestion = { title: string; description: string };

export function AiSuggestions({ existingTitles }: { existingTitles: string[] }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const createTask = useCreateTask();

  async function handleSuggest() {
    setLoading(true);
    try {
      const result = await suggestTasks(existingTitles);
      setSuggestions(result);
    } catch {
      toast.error("Could not get AI suggestions");
    } finally {
      setLoading(false);
    }
  }

  function addSuggestion(suggestion: Suggestion) {
    createTask.mutate({
      title: suggestion.title,
      description: suggestion.description,
      status: "TODO",
    });
    setSuggestions((prev) => prev.filter((s) => s.title !== suggestion.title));
  }

  return (
    <div className="space-y-3 rounded-lg border border-dashed bg-accent/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Need ideas?</p>
          <p className="text-xs text-muted-foreground">
            Let AI suggest what to work on next.
          </p>
        </div>
        <Button onClick={handleSuggest} disabled={loading}>
          <Sparkles className="size-4" />
          {loading ? "Thinking..." : "Suggest tasks with AI"}
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="grid gap-2 pt-1 sm:grid-cols-3">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.title} className="shadow-none">
              <CardContent className="space-y-2 p-4">
                <p className="text-sm font-medium">{suggestion.title}</p>
                <p className="text-xs text-muted-foreground">
                  {suggestion.description}
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => addSuggestion(suggestion)}
                >
                  <Plus className="size-4" />
                  Add
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

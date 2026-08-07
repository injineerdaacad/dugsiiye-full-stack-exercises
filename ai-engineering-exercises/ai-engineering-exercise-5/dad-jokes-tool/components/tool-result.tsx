import { JokeCard } from "@/components/joke-card";

export type ToolPart = {
  type: string;
  output?: {
    success?: boolean;
    error?: string;
    id?: string;
    text?: string;
    source?: string;
    count?: number;
    results?: { id: string; text: string }[];
    joke?: { id: string; text: string; upvotes: number; downvotes: number };
  };
};

export function ToolResult({ part, onRate }: { part: ToolPart; onRate: (jokeId: string, up: boolean) => void }) {
  const data = part.output;
  if (!data) return null;

  if (data.error) {
    return <div className="mt-2 rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">{data.error}</div>;
  }

  if (data.text && data.id) {
    return <JokeCard text={data.text} source={data.source} onRate={(up) => onRate(data.id!, up)} />;
  }

  if (data.joke) {
    return (
      <div className="mt-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600">
        👍 {data.joke.upvotes} · 👎 {data.joke.downvotes}
      </div>
    );
  }
  
  if (data.results) {
    return (
      <div className="mt-2 space-y-1">
        {data.results.map((r) => (
          <div key={r.id} className="rounded border border-zinc-200 bg-white p-2 text-sm">
            {r.text}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

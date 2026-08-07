import { MovieCard } from "@/components/movie-card";

export type ToolPart = {
  type: string;
  output?: {
    success?: boolean;
    error?: string;
    cached?: boolean;
    movie?: Record<string, string>;
    results?: Record<string, string>[];
    source?: string;
  };
};

export function ToolResult({ part }: { part: ToolPart }) {
  const data = part.output;
  if (!data) return null;
  if (data.error) {
    return <div className="mt-2 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{data.error}</div>;
  }
  
  if (data.movie) return <MovieCard movie={data.movie} cached={data.cached} />;
  if (data.results && data.results.length > 0) {
    return (
      <div className="mt-2 space-y-2">
        {data.results.map((m, i) => (
          <MovieCard key={i} movie={m} />
        ))}
      </div>
    );
  }
  return null;
}

export function JokeCard({text, source, onRate}: {text: string; source?: string; onRate: (up: boolean) => void;}) {
  return (
    <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
      <div className="text-sm text-zinc-800">{text}</div>
      <div className="mt-2 flex items-center gap-2">
        <button onClick={() => onRate(true)} className="rounded bg-white px-2 py-1 text-xs hover:bg-zinc-100">
          👍
        </button>
        <button onClick={() => onRate(false)} className="rounded bg-white px-2 py-1 text-xs hover:bg-zinc-100">
          👎
        </button>
        {source && <span className="text-xs text-zinc-400">via {source}</span>}
      </div>
    </div>
  );
}

export function MovieCard({ movie, cached }: { movie: Record<string, string>; cached?: boolean }) {
  return (
    <div className="mt-2 flex gap-3 rounded-lg border border-zinc-200 bg-white p-3">
      {movie.Poster && movie.Poster !== "N/A" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={movie.Poster} alt={movie.Title} className="h-32 w-24 rounded object-cover" />
      ) : (
        <div className="flex h-32 w-24 items-center justify-center rounded bg-zinc-100 text-xs text-zinc-400">
          No poster
        </div>
      )}
      
      <div className="flex-1 text-sm">
        <div className="font-semibold text-zinc-900">
          {movie.Title} {movie.Year ? `(${movie.Year})` : ""}
        </div>
        {movie.Genre && <div className="text-zinc-500">{movie.Genre}</div>}
        {movie.imdbRating && <div className="text-amber-600">⭐ {movie.imdbRating}/10</div>}
        {movie.Director && <div className="text-zinc-600">Dir: {movie.Director}</div>}
        {movie.Plot && <div className="mt-1 text-zinc-700">{movie.Plot}</div>}
        {cached && <div className="mt-1 text-xs text-zinc-400">(from cache)</div>}
      </div>
    </div>
  );
}

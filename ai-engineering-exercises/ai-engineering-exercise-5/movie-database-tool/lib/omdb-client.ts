const OMDB_KEY = process.env.OMDB_API_KEY;

export type OmdbMovie = {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  imdbID: string;
  Response: string;
  Error?: string;
};

export type OmdbSearchResult = {
  Search?: { Title: string; Year: string; imdbID: string; Type: string; Poster: string }[];
  totalResults?: string;
  Response: string;
  Error?: string;
};

export async function omdbFetch<T>(params: Record<string, string>): Promise<T> {
  if (!OMDB_KEY) throw new Error("Missing OMDB_API_KEY. Get a free key at https://www.omdbapi.com/apikey.aspx");

  const url = `https://www.omdbapi.com/?${new URLSearchParams({ ...params, apikey: OMDB_KEY })}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`OMDb request failed: ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

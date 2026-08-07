import { streamText, convertToModelMessages, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai-model";
import { omdbFetch, type OmdbMovie, type OmdbSearchResult } from "@/lib/omdb-client";
import { findCachedMovie, cacheMovie, findCachedMoviesByGenreOrYear } from "@/models/movie-cache";

const searchMovieByTitle = tool({
  description: "Look up detailed info for one movie by exact title (and optional year). Caches the result.",
  inputSchema: z.object({
    title: z.string(),
    year: z.number().optional(),
  }),

  execute: async ({ title, year }) => {
    try {
      const cached = await findCachedMovie(title, year);
      if (cached) return { success: true, cached: true, movie: cached };

      const movie = await omdbFetch<OmdbMovie>({ t: title, ...(year ? { y: String(year) } : {}) });
      if (movie.Response === "False") {
        return { success: false, cached: false, error: movie.Error ?? "Movie not found" };
      }

      await cacheMovie(title, year, movie);
      return { success: true, cached: false, movie };
    } catch (err) {
      return { success: false, cached: false, error: err instanceof Error ? err.message : String(err) };
    }
  },
});

const searchMoviesPartial = tool({
  description: "Search for movies by a partial/approximate title. Returns a short list of matches.",
  inputSchema: z.object({
    query: z.string(),
  }),

  execute: async ({ query }) => {
    try {
      const data = await omdbFetch<OmdbSearchResult>({ s: query });
      if (data.Response === "False") {
        return { success: false, results: [], error: data.Error ?? "No matches found" };
      }
      return { success: true, results: data.Search ?? [], totalResults: data.totalResults };
    } catch (err) {
      return { success: false, results: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

const getMovieRecommendations = tool({
  description: "Recommend movies similar to a genre and/or year, using cached lookups first.",
  inputSchema: z.object({
    genre: z.string().optional(),
    year: z.number().optional(),
  }),

  execute: async ({ genre, year }) => {
    try {
      const cachedMatches = await findCachedMoviesByGenreOrYear(genre, year);
      if (cachedMatches.length > 0) {
        return { success: true, source: "cache", results: cachedMatches };
      }

      const searchTerm = genre ?? String(year ?? "movie");
      const data = await omdbFetch<OmdbSearchResult>({ s: searchTerm, ...(year ? { y: String(year) } : {}) });
      if (data.Response === "False" || !data.Search) {
        return { success: false, source: "omdb", results: [], error: data.Error ?? "No recommendations found" };
      }
      return {
        success: true,
        source: "omdb",
        results: data.Search.slice(0, 5).map((m) => ({ Title: m.Title, Year: m.Year, imdbID: m.imdbID })),
      };
    } catch (err) {
      return { success: false, source: "error", results: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

export async function handleChatRequest(messages: UIMessage[]) {
  const result = streamText({
    model,
    system:
      "You are a movie database assistant backed by OMDb. Use searchMovieByTitle for a specific movie, " +
      "searchMoviesPartial when the user gives a vague/partial title, and getMovieRecommendations for " +
      "genre/year-based suggestions. Always call a tool rather than guessing movie facts. The tool result " +
      "is already displayed to the user as a card/list — do not restate plot, cast, or other fields " +
      "yourself. Reply with a single short sentence (max 15 words) noting what was found, nothing more.",
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: { searchMovieByTitle, searchMoviesPartial, getMovieRecommendations },
  });

  return result.toUIMessageStreamResponse();
}

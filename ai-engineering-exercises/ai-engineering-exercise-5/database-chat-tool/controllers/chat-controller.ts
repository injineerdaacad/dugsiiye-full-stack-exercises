import { streamText, convertToModelMessages, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai-model";
import { findMovies, countMoviesByGenre } from "@/models/movie";
import { findUsers } from "@/models/user";
import { findReviews } from "@/models/review";

const queryMovies = tool({
  description: "Search movies by genre, rating range, year, or director",
  inputSchema: z.object({
    genre: z.string().optional().describe("e.g. sci-fi, drama, comedy, horror, action, crime"),
    minRating: z.number().min(0).max(10).optional(),
    maxRating: z.number().min(0).max(10).optional(),
    year: z.number().optional(),
    director: z.string().optional(),
  }),

  execute: async (filters) => {
    try {
      const results = await findMovies(filters);
      return { success: true, count: results.length, filters, results };
    } catch (err) {
      return { success: false, count: 0, filters, results: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

const queryUsers = tool({
  description: "Search users by age range or favorite genre",
  inputSchema: z.object({
    minAge: z.number().min(0).optional(),
    maxAge: z.number().min(0).optional(),
    favoriteGenre: z.string().optional(),
  }),

  execute: async (filters) => {
    try {
      const results = await findUsers(filters);
      return { success: true, count: results.length, filters, results };
    } catch (err) {
      return { success: false, count: 0, filters, results: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

const countMoviesByGenreTool = tool({
  description: "Count total movies grouped by genre",
  inputSchema: z.object({}),

  execute: async () => {
    try {
      return { success: true, results: await countMoviesByGenre() };
    } catch (err) {
      return { success: false, results: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

const queryReviews = tool({
  description: "Search reviews by movie title or minimum rating",
  inputSchema: z.object({
    movieTitle: z.string().optional(),
    minRating: z.number().min(0).max(10).optional(),
  }),
  
  execute: async (filters) => {
    try {
      const results = await findReviews(filters);
      return { success: true, count: results.length, filters, results };
    } catch (err) {
      return { success: false, count: 0, filters, results: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

export async function handleChatRequest(messages: UIMessage[]) {
  const result = streamText({
    model,
    system:
      "You are a database assistant for a movie app. Use the available tools to answer questions about " +
      "movies, users, and reviews. Always call a tool rather than guessing data. The tool result is " +
      "already displayed to the user as a table — do not restate, list, or repeat the rows yourself. " +
      "Reply with a single short sentence (max 15 words) noting the count or a highlight, nothing more.",
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: { queryMovies, queryUsers, countMoviesByGenre: countMoviesByGenreTool, queryReviews },
  });

  return result.toUIMessageStreamResponse();
}

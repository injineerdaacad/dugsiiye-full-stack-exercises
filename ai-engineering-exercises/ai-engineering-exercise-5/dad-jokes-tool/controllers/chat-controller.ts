import { streamText, convertToModelMessages, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai-model";
import { fetchDadJoke, searchDadJokes, LOCAL_JOKES } from "@/lib/jokes-client";
import { saveJoke, findJokesByKeyword, rateJoke as rateJokeInDb } from "@/models/joke";

const getRandomJoke = tool({
  description: "Get a random joke. Category can be dad, programming, or general.",
  inputSchema: z.object({
    category: z.enum(["dad", "programming", "general"]).default("dad"),
  }),

  execute: async ({ category }) => {
    if (category === "dad") {
      const joke = await fetchDadJoke();
      if (joke) {
        await saveJoke(joke.id, "dad", joke.text, "api");
        return { success: true, source: "api", ...joke };
      }
      // API failed — fall back to a locally stored dad joke.
      const fallback = LOCAL_JOKES.dad[Math.floor(Math.random() * LOCAL_JOKES.dad.length)];
      await saveJoke(fallback.id, "dad", fallback.text, "local");
      return { success: true, source: "local-fallback", ...fallback };
    }

    const pool = LOCAL_JOKES[category];
    const joke = pool[Math.floor(Math.random() * pool.length)];
    await saveJoke(joke.id, category, joke.text, "local");
    return { success: true, source: "local", ...joke };
  },
});

const searchJokes = tool({
  description: "Search jokes by keyword, across dad jokes and stored jokes",
  inputSchema: z.object({
    keyword: z.string(),
  }),

  execute: async ({ keyword }) => {
    try {
      const apiResults = await searchDadJokes(keyword);
      if (apiResults) {
        for (const j of apiResults) await saveJoke(j.id, "dad", j.text, "api");
      }

      const stored = await findJokesByKeyword(keyword);
      const combined = [...(apiResults ?? []), ...stored.map((s) => ({ id: s.id, text: s.text }))];
      const unique = Array.from(new Map(combined.map((j) => [j.id, j])).values());

      return { success: true, count: unique.length, results: unique.slice(0, 10) };
    } catch (err) {
      return { success: false, count: 0, results: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

const rateJoke = tool({
  description: "Rate a joke thumbs up or down, by joke id",
  inputSchema: z.object({
    jokeId: z.string(),
    thumbsUp: z.boolean(),
  }),
  
  execute: async ({ jokeId, thumbsUp }) => {
    try {
      const result = await rateJokeInDb(jokeId, thumbsUp);
      if (!result) return { success: false, error: "Joke not found. Fetch it first before rating." };
      return { success: true, joke: result };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  },
});

export async function handleChatRequest(messages: UIMessage[]) {
  const result = streamText({
    model,
    system:
      "You are a joke bot. Use getRandomJoke for a fresh joke (categories: dad, programming, general), " +
      "searchJokes to find jokes by keyword, and rateJoke when the user gives a thumbs up/down on a joke " +
      "you just told them (use its id). The joke text is already displayed to the user as a card — do " +
      "not repeat the joke text or its id in your own words. Reply with only a short reaction or " +
      "follow-up question (max 10 words).",
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: { getRandomJoke, searchJokes, rateJoke },
  });

  return result.toUIMessageStreamResponse();
}

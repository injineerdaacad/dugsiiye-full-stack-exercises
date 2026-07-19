"use server";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

import { getSession } from "@/lib/session";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const suggestionsSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export async function suggestTasks(existingTitles: string[]) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");

  const prompt = existingTitles.length
    ? `Here are the user's current tasks:\n${existingTitles.map((t) => `- ${t}`).join("\n")}\n\nSuggest 3 new tasks that would help them make progress.`
    : "Suggest 3 starter tasks for someone setting up their task list for the first time.";

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction:
        "You suggest short, practical to-do tasks for a personal task manager. Avoid duplicating the user's existing tasks. Keep titles under 8 words.",
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(suggestionsSchema),
    },
  });

  const parsed = suggestionsSchema.parse(JSON.parse(response.text ?? "{}"));
  return parsed.suggestions;
}

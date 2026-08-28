import { streamText, convertToModelMessages, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai-model";
import { findRelevantDiseases } from "@/models/disease";
import { findVetsByRegion } from "@/models/vet";

const diagnoseLivestock = tool({
  description:
    "Look up known diseases matching an animal's symptoms, grounded in a real veterinary knowledge base. " +
    "Always use this before explaining a diagnosis, treatment, or medicine to the user.",
  inputSchema: z.object({
    animalType: z.enum(["camel", "goat", "sheep", "cattle"]),
    symptoms: z.string().describe("The symptoms described by the herder, in their own words"),
  }),

  execute: async ({ animalType, symptoms }) => {
    try {
      const matches = await findRelevantDiseases(animalType, symptoms, 3);
      if (matches.length === 0) {
        return { success: false, matches: [], error: "No matching diseases found in the knowledge base" };
      }
      return { success: true, matches };
    } catch (err) {
      return { success: false, matches: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

const findNearestVet = tool({
  description: "Look up vet/agrovet contacts in a Somali region. Use when the case is urgent or the user asks for a vet.",
  inputSchema: z.object({
    region: z.string().describe("Somali region name, e.g. Banaadir, Woqooyi Galbeed, Bay"),
  }),

  execute: async ({ region }) => {
    try {
      const vets = await findVetsByRegion(region);
      return { success: true, count: vets.length, vets };
    } catch (err) {
      return { success: false, count: 0, vets: [], error: err instanceof Error ? err.message : String(err) };
    }
  },
});

export async function handleChatRequest(messages: UIMessage[]) {
  const result = streamText({
    model,
    system:
      "You are Livestock Doctor, a livestock health assistant for Somali herders. " +
      "Reply in the same language the user writes in — if they write in Af-Soomaali, reply in Af-Soomaali; " +
      "if in English, reply in English; if they mix both, mirror that mix. Keep disease names in their " +
      "standard form (e.g. 'CCPP (Contagious Caprine Pleuropneumonia)') even when the rest of your reply is " +
      "in Af-Soomaali, since those are the recognized medical/vaccine names herders and vets will also use. " +
      "If the user attaches a photo of the animal, describe what you visually observe (skin condition, " +
      "swelling, discharge, wounds, posture, coat) and fold that into the symptoms text — but a photo alone " +
      "is never a diagnosis by itself. Always call diagnoseLivestock before giving a diagnosis — never invent " +
      "disease names, symptoms, or medicine from your own memory, whether from text or from what you see in " +
      "an image. Base your answer strictly on the matches diagnoseLivestock returns. " +
      "For the most likely match, explain clearly: what the disease is, its cause, how it spreads, " +
      "the real treatment and medicine used, prevention, and the urgency level. " +
      "If urgency is 'see a vet soon' or 'see a vet urgently', proactively call findNearestVet " +
      "(ask the user's region if you don't know it) and share the contact. " +
      "Be direct and practical — the herder needs to know what to do right now.",
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: { diagnoseLivestock, findNearestVet },
  });

  return result.toUIMessageStreamResponse();
}

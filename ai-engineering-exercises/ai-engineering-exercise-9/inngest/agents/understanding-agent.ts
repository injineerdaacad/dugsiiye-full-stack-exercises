import { createAgent, createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { model } from "@/lib/gemini-model";
import type { ShoppingState } from "@/lib/types";

const recordUnderstanding = createTool({
  name: "record_understanding",
  description: "Record the parsed, structured product request once you've identified it.",
  parameters: z.object({
    product: z.string().describe("The core product name, e.g. 'MacBook Pro 16-inch M4 Max'"),
    brand: z.string().optional(),
    model: z.string().optional(),
    variant: z.string().optional().describe("Storage, size, color, or other variant details"),
    condition: z.enum(["new", "used", "any"]).default("new"),
    clarificationNeeded: z
      .string()
      .optional()
      .describe("Only set this if the request is too ambiguous to search confidently"),
  }),
  handler: (input, { network }) => {
    const state = network!.state.data as ShoppingState;
    state.understanding = input;
    return { success: true };
  },
});

export const understandingAgent = createAgent<ShoppingState>({
  name: "Product Understanding Agent",
  description: "Parses the user's shopping request into a structured product spec.",
  system:
    "You are the Product Understanding Agent in a shopping price-comparison pipeline. " +
    "Read the user's product request and identify exactly what they want to buy: product, " +
    "brand, model, variant (storage/size/color), and condition (new/used/any — default new " +
    "if unstated). If the request is genuinely too ambiguous to search (e.g. no product at " +
    "all), set clarificationNeeded to a short question, but otherwise make reasonable " +
    "assumptions rather than blocking. Always call record_understanding exactly once.",
  model,
  tools: [recordUnderstanding],
});

import { createAgent, createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { model } from "@/lib/gemini-model";
import type { MatchedResult, ShoppingState } from "@/lib/types";

const recordMatches = createTool({
  name: "record_matches",
  description: "Record which verified results are genuinely the requested product, and which to reject.",
  parameters: z.object({
    judgments: z.array(
      z.object({
        index: z.number().describe("Index into the verified results array"),
        isMatch: z.boolean(),
        reason: z.string().describe("Short reason, e.g. 'wrong storage size' or 'exact match'"),
      }),
    ),
  }),
  handler: (input, { network }) => {
    const state = network!.state.data as ShoppingState;
    const verified = state.verified ?? [];

    const matched: MatchedResult[] = input.judgments
      .map((j) => {
        const item = verified[j.index];
        if (!item) return null;
        return { ...item, isMatch: j.isMatch, matchReason: j.reason };
      })
      .filter((x): x is MatchedResult => x !== null);

    state.matched = matched;
    return { success: true, matchedCount: matched.filter((m) => m.isMatch).length };
  },
});

export const matchingAgent = createAgent<ShoppingState>({
  name: "Product Matching Agent",
  description: "Judges whether each verified result is actually the requested product.",
  system: async ({ network }) => {
    const state = network?.state.data as ShoppingState | undefined;
    return (
      "You are the Product Matching Agent. The requested product is: " +
      `${JSON.stringify(state?.understanding)}.\n\n` +
      "Here are the verified seller results, as a JSON array (use the array index for your judgments):\n" +
      `${JSON.stringify(state?.verified, null, 2)}\n\n` +
      "For EVERY item in that array, judge whether it is genuinely the same product: check " +
      "brand, model, variant (storage/size/color), and condition. Reject accessories, cases, " +
      "chargers, wrong storage/variant, wrong condition (e.g. used when new was requested), " +
      "and clearly wrong products. Items with priceVerified: false and no usable snippet info " +
      "should also be rejected as isMatch: false. Call record_matches with a judgment for " +
      "every single index, exactly once."
    );
  },
  model,
  tools: [recordMatches],
});

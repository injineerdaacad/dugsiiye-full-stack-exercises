import { createAgent, createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { model } from "@/lib/gemini-model";
import { serperSearch } from "@/lib/serper";
import type { Candidate, ShoppingState } from "@/lib/types";

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const searchWeb = createTool({
  name: "search_web",
  description: "Search the web for sellers using several distinct queries, then record candidate sellers.",
  parameters: z.object({
    queries: z
      .array(z.string())
      .min(2)
      .max(6)
      .describe("Distinct search queries to try, e.g. product+buy, product+price, site:retailer.com"),
  }),
  handler: async (input, { network }) => {
    const state = network!.state.data as ShoppingState;
    const resultsPerQuery = await Promise.all(input.queries.map((q) => serperSearch(q).catch(() => [])));

    const seenDomains = new Set<string>();
    const candidates: Candidate[] = [];
    for (const results of resultsPerQuery) {
      for (const r of results) {
        const domain = domainOf(r.link);
        if (seenDomains.has(domain)) continue;
        seenDomains.add(domain);
        candidates.push({ title: r.title, link: r.link, snippet: r.snippet });
      }
    }

    state.candidates = candidates.slice(0, 12);
    return { success: true, count: state.candidates.length };
  },
});

export const searchAgent = createAgent<ShoppingState>({
  name: "Search Agent",
  description: "Generates search queries and finds candidate sellers via Serper.",
  system: async ({ network }) => {
    const understanding = (network?.state.data as ShoppingState | undefined)?.understanding;
    return (
      "You are the Search Agent in a shopping price-comparison pipeline. The product has " +
      `already been identified as: ${JSON.stringify(understanding)}. ` +
      "Generate 3-5 distinct, effective search queries to find real sellers of this exact " +
      "product (vary phrasing: 'buy', 'price', specific retailer site: queries for major " +
      "stores like amazon.com, bestbuy.com, walmart.com if relevant to the product's likely " +
      "region). Then call search_web with those queries exactly once."
    );
  },
  model,
  tools: [searchWeb],
});

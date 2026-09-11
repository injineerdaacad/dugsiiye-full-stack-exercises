import { createAgent, createTool } from "@inngest/agent-kit";
import { generateObject } from "ai";
import { z } from "zod";
import { model as agentModel } from "@/lib/gemini-model";
import { model as extractModel } from "@/lib/ai-model";
import { fetchPageText } from "@/lib/fetch-page";
import type { ShoppingState, VerifiedResult } from "@/lib/types";

const extractionSchema = z.object({
  isProductPage: z.boolean().describe("Whether this page is actually selling the product, not e.g. a review/news article"),
  storeName: z.string(),
  productName: z.string(),
  price: z.number().nullable(),
  currency: z.string().nullable().describe("ISO currency code, e.g. USD, EUR"),
  availability: z.enum(["in_stock", "out_of_stock", "unknown"]),
  condition: z.enum(["new", "used", "unknown"]),
});

const verifyCandidates = createTool({
  name: "verify_candidates",
  description: "Visit every candidate seller page and verify the real product, price, and availability.",
  parameters: z.object({}),
  handler: async (_input, { network }) => {
    const state = network!.state.data as ShoppingState;
    const candidates = state.candidates ?? [];

    const verified = await Promise.all(
      candidates.map(async (candidate): Promise<VerifiedResult> => {
        const pageText = await fetchPageText(candidate.link);

        if (!pageText) {
          return {
            storeName: new URL(candidate.link).hostname.replace(/^www\./, ""),
            productName: candidate.title,
            productUrl: candidate.link,
            price: null,
            currency: null,
            availability: "unknown",
            condition: "unknown",
            priceVerified: false,
          };
        }

        try {
          const { object } = await generateObject({
            model: extractModel,
            schema: extractionSchema,
            prompt:
              `This is the visible text of a webpage found while searching for "${candidate.title}".\n\n` +
              `Extract the product name, seller/store name, price, currency, availability, and ` +
              `condition (new/used) if this page is genuinely selling the product. If it's not ` +
              `a product page (e.g. a news article, review, or unrelated page), set isProductPage ` +
              `to false.\n\nPAGE TEXT:\n${pageText}`,
          });

          if (!object.isProductPage) {
            return {
              storeName: new URL(candidate.link).hostname.replace(/^www\./, ""),
              productName: candidate.title,
              productUrl: candidate.link,
              price: null,
              currency: null,
              availability: "unknown",
              condition: "unknown",
              priceVerified: false,
            };
          }

          return {
            storeName: object.storeName,
            productName: object.productName,
            productUrl: candidate.link,
            price: object.price,
            currency: object.currency,
            availability: object.availability,
            condition: object.condition,
            priceVerified: object.price !== null,
          };
        } catch {
          return {
            storeName: new URL(candidate.link).hostname.replace(/^www\./, ""),
            productName: candidate.title,
            productUrl: candidate.link,
            price: null,
            currency: null,
            availability: "unknown",
            condition: "unknown",
            priceVerified: false,
          };
        }
      }),
    );

    state.verified = verified;
    return { success: true, count: verified.length };
  },
});

export const verificationAgent = createAgent<ShoppingState>({
  name: "Web Verification Agent",
  description: "Visits each candidate seller's page to verify the product and price.",
  system:
    "You are the Web Verification Agent. Call verify_candidates exactly once — it will visit " +
    "every candidate seller page for you and extract verified product/price data.",
  model: agentModel,
  tools: [verifyCandidates],
});

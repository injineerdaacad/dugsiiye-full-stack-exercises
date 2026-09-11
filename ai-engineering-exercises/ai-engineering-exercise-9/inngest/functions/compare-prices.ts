import { createState } from "@inngest/agent-kit";
import { inngest } from "../client";
import { understandingAgent } from "../agents/understanding-agent";
import { searchAgent } from "../agents/search-agent";
import { verificationAgent } from "../agents/verification-agent";
import { matchingAgent } from "../agents/matching-agent";
import { updateJob } from "@/lib/job-store";
import { normalizePrices, rankResults } from "@/lib/finalize-results";
import type { ShoppingState } from "@/lib/types";

export const comparePrices = inngest.createFunction(
  {
    id: "compare-prices",
    triggers: [{ event: "shopping/compare.requested" }],
    // Serper + Gemini rate limits — don't let dozens of comparisons hammer both at once.
    concurrency: { limit: 3 },
    onFailure: async ({ event }) => {
      const { jobId } = (event.data.event.data ?? {}) as { jobId: string };
      if (jobId) updateJob(jobId, { stage: "failed", error: "Pipeline failed after retries" });
    },
  },
  async ({ event, step }) => {
    const { jobId, query } = event.data as { jobId: string; query: string };

    const state = createState<ShoppingState>({ query });

    updateJob(jobId, { stage: "understanding" });
    await understandingAgent.run(query, { state, step });

    updateJob(jobId, { stage: "search" });
    await searchAgent.run(query, { state, step });

    updateJob(jobId, { stage: "verification", candidateCount: state.data.candidates?.length });
    await verificationAgent.run(query, { state, step });

    updateJob(jobId, { stage: "matching", verifiedCount: state.data.verified?.length });
    await matchingAgent.run(query, { state, step });

    const matched = state.data.matched ?? [];
    updateJob(jobId, { stage: "normalization", matchedCount: matched.filter((m) => m.isMatch).length });
    const normalized = normalizePrices(matched);

    updateJob(jobId, { stage: "ranking" });
    const ranked = rankResults(normalized);

    updateJob(jobId, { stage: "done", results: ranked });
    return { jobId, results: ranked };
  },
);

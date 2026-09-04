import { generateObject, generateText } from "ai";
import { z } from "zod";
import { inngest } from "../client";
import { model } from "@/lib/ai-model";
import { updateJob } from "@/lib/job-store";

export const researchPipeline = inngest.createFunction(
  {
    id: "research-pipeline",
    triggers: [{ event: "research/requested" }],
    concurrency: { limit: 3 }, // Gemini free-tier rate limits
    onFailure: async ({ event, error }) => {
      const { jobId } = event.data.event.data as { jobId: string; topic: string };
      updateJob(jobId, { status: "failed", error: error.message });
    },
  },
  async ({ event, step }) => {
    const { jobId, topic } = event.data as { jobId: string; topic: string };

    const outline = await step.run("generate-outline", async () => {
      const { object } = await generateObject({
        model,
        schema: z.object({ sections: z.array(z.string()).min(3).max(6) }),
        prompt: `Create a short research outline (3-6 section titles) for the topic: "${topic}".`,
      });
      return object.sections;
    });
    updateJob(jobId, { status: "outline", outline });

    const article = await step.run("write-draft", async () => {
      const { text } = await generateText({
        model,
        prompt:
          `Write a clear, well-organized article on "${topic}" following this outline:\n` +
          outline.map((s, i) => `${i + 1}. ${s}`).join("\n") +
          `\n\nUse markdown headings for each section.`,
      });
      return text;
    });
    updateJob(jobId, { status: "drafting", article });

    await step.sleep("pace-before-summary", "2s"); // rate-limit courtesy pause

    const summary = await step.run("write-summary", async () => {
      const { text } = await generateText({
        model,
        prompt: `Summarize this article in exactly 2 sentences:\n\n${article}`,
      });
      return text;
    });

    updateJob(jobId, { status: "done", summary });
    return { jobId, topic, outline, article, summary };
  },
);

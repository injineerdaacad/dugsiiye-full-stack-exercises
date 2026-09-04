import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { researchPipeline } from "@/inngest/functions/research-pipeline";
import { dailyTip } from "@/inngest/functions/daily-tip";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [researchPipeline, dailyTip],
});

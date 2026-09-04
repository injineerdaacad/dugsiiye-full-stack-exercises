import { generateText } from "ai";
import { inngest } from "../client";
import { model } from "@/lib/ai-model";
import { addDailyTip } from "@/lib/job-store";

const TOPICS = [
  "livestock health for pastoralist herders in Somalia",
  "drought preparedness for goat and camel herds",
  "simple record-keeping for small livestock businesses",
];

export const dailyTip = inngest.createFunction(
  {
    id: "daily-tip",
    triggers: [{ cron: "*/1 * * * *" }], // every minute for demo; use "0 6 * * *" for real 6am daily
  },
  async ({ step }) => {
    const tip = await step.run("generate-tip", async () => {
      const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
      const { text } = await generateText({
        model,
        prompt: `Write one short, practical daily tip (1-2 sentences, no markdown) about ${topic}.`,
      });
      return text;
    });

    await step.run("save-tip", async () => {
      addDailyTip(tip);
    });

    return { tip };
  },
);

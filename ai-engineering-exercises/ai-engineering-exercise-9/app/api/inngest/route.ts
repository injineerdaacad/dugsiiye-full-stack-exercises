import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { comparePrices } from "@/inngest/functions/compare-prices";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [comparePrices],
});

import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { createJob } from "@/lib/job-store";

export async function POST(req: Request) {
  const { query } = await req.json();
  if (!query || typeof query !== "string" || !query.trim()) {
    return NextResponse.json({ error: "A product query is required" }, { status: 400 });
  }

  const jobId = crypto.randomUUID();
  createJob(jobId, query.trim());

  await inngest.send({
    name: "shopping/compare.requested",
    data: { jobId, query: query.trim() },
  });

  return NextResponse.json({ jobId, status: "queued" });
}

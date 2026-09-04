import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { createJob } from "@/lib/job-store";

export async function POST(req: Request) {
  const { topic } = await req.json();
  if (!topic || typeof topic !== "string" || !topic.trim()) {
    return NextResponse.json({ error: "topic is required" }, { status: 400 });
  }

  const jobId = crypto.randomUUID();
  createJob(jobId, topic.trim());

  await inngest.send({ name: "research/requested", data: { jobId, topic: topic.trim() } });

  return NextResponse.json({ jobId, status: "queued" });
}

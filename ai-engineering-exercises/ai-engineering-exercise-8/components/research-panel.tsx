"use client";

import { useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import type { ResearchJob, DailyTip } from "@/lib/job-store";

const STAGES: { key: ResearchJob["status"]; label: string }[] = [
  { key: "queued", label: "Queued" },
  { key: "outline", label: "Outline" },
  { key: "drafting", label: "Drafting" },
  { key: "summarizing", label: "Summarizing" },
  { key: "done", label: "Done" },
];

function stageIndex(status: ResearchJob["status"]) {
  return STAGES.findIndex((s) => s.key === status);
}

export function ResearchPanel() {
  const [topic, setTopic] = useState("");
  const [job, setJob] = useState<ResearchJob | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [tips, setTips] = useState<DailyTip[]>([]);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const loadTips = () => fetch("/api/tips").then((r) => r.json()).then((d) => setTips(d.tips));
    loadTips();
    const interval = setInterval(loadTips, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const startResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || submitting) return;
    setSubmitting(true);
    setJob(null);

    const res = await fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const { jobId } = await res.json();
    setSubmitting(false);

    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const jobRes = await fetch(`/api/research/${jobId}`);
      const data: ResearchJob = await jobRes.json();
      setJob(data);
      if (data.status === "done" || data.status === "failed") {
        if (pollRef.current) clearInterval(pollRef.current);
      }
    }, 1500);
  };

  return (
    <div className="mx-auto flex max-w-5xl gap-6 p-6">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">🔬 AI Research Pipeline</h1>
          <p className="text-sm text-zinc-500">
            Background research jobs powered by Inngest + Gemini — submit a topic and get an
            instant response while the multi-step work runs behind the scenes.
          </p>
        </div>

        <form onSubmit={startResearch} className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-zinc-300 p-3 text-sm focus:border-indigo-500 focus:outline-none"
            value={topic}
            placeholder="e.g. Livestock trade in the Horn of Africa"
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            type="submit"
            disabled={submitting || !topic.trim()}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "Starting..." : "Start Research"}
          </button>
        </form>

        {job && (
          <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4">
            <div className="flex items-center gap-2 text-xs">
              {STAGES.map((stage, i) => {
                const current = stageIndex(job.status);
                const active = i <= current && job.status !== "failed";
                return (
                  <div key={stage.key} className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 font-medium ${
                        job.status === "failed" && i === current
                          ? "bg-red-100 text-red-700"
                          : active
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      {stage.label}
                    </span>
                    {i < STAGES.length - 1 && <span className="text-zinc-300">→</span>}
                  </div>
                );
              })}
            </div>

            {job.status === "failed" && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                Job failed after retries: {job.error}
              </div>
            )}

            {job.outline && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Outline</div>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-zinc-700">
                  {job.outline.map((section, i) => (
                    <li key={i}>{section}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.summary && (
              <div className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">
                <span className="font-semibold">Summary: </span>
                {job.summary}
              </div>
            )}

            {job.article && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Full article</div>
                <Streamdown className="prose prose-sm mt-1 max-w-none">{job.article}</Streamdown>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sticky top-6 w-72 shrink-0 self-start">
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold text-zinc-900">📅 Daily Tips</div>
          <p className="mt-1 text-xs text-zinc-500">Generated on a schedule by a cron-triggered Inngest function.</p>
          <div className="mt-3 max-h-96 space-y-2 overflow-y-auto pr-1">
            {tips.length === 0 && <div className="text-xs text-zinc-400">No tips generated yet — wait a minute.</div>}
            {tips.map((tip) => (
              <div key={tip.id} className="rounded-lg bg-zinc-50 p-2 text-xs text-zinc-700">
                {tip.tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

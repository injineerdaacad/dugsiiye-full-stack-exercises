"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShoppingCart,
  Search,
  FileSearch,
  Globe,
  ShieldCheck,
  ListChecks,
  DollarSign,
  TrendingDown,
  Check,
  X,
  ExternalLink,
  Loader2,
  AlertCircle,
  PackageSearch,
} from "lucide-react";
import type { ComparisonJob, JobStage } from "@/lib/job-store";

const STAGES: { key: JobStage; label: string; icon: typeof FileSearch; blurb: string }[] = [
  { key: "understanding", label: "Understanding", icon: FileSearch, blurb: "Parse exactly what you want to buy" },
  { key: "search", label: "Search", icon: Globe, blurb: "Find real sellers across the web" },
  { key: "verification", label: "Verification", icon: ShieldCheck, blurb: "Visit each page, confirm the price" },
  { key: "matching", label: "Matching", icon: ListChecks, blurb: "Reject accessories and wrong variants" },
  { key: "normalization", label: "Normalization", icon: DollarSign, blurb: "Convert currencies to compare fairly" },
  { key: "ranking", label: "Ranking", icon: TrendingDown, blurb: "Sort lowest verified price first" },
];

function stageIndex(stage: JobStage) {
  const i = STAGES.findIndex((s) => s.key === stage);
  return i === -1 ? (stage === "done" ? STAGES.length : 0) : i;
}

export function ComparePanel() {
  const [query, setQuery] = useState("");
  const [job, setJob] = useState<ComparisonJob | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const startCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || submitting) return;
    setSubmitting(true);
    setJob(null);

    const res = await fetch("/api/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const { jobId } = await res.json();
    setSubmitting(false);

    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const jobRes = await fetch(`/api/compare/${jobId}`);
      const data: ComparisonJob = await jobRes.json();
      setJob(data);
      if (data.stage === "done" || data.stage === "failed") {
        if (pollRef.current) clearInterval(pollRef.current);
      }
    }, 1500);
  };

  const results = job?.results ?? [];
  const bestPrice = results[0];
  const currentStageIdx = job ? stageIndex(job.stage) : -1;
  const isRunning = job && job.stage !== "done" && job.stage !== "failed";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-200">
            <ShoppingCart className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Shopping Price Comparison Agent</h1>
          <p className="mt-1 text-sm text-slate-500">
            A 6-agent pipeline finds, verifies, and ranks real sellers — lowest verified price first.
          </p>
        </div>

        <form onSubmit={startCompare} className="mb-8">
          <div className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm shadow-slate-200/50 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                className="w-full py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                value={query}
                placeholder="e.g. MacBook Pro 16-inch M4 Max"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !query.trim()}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 enabled:cursor-pointer"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Starting..." : "Compare Prices"}
            </button>
          </div>
        </form>

        {!job && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {STAGES.map((stage, i) => (
              <div
                key={stage.key}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm shadow-slate-200/40"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                    {i + 1}
                  </div>
                  <stage.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">{stage.label}</div>
                <div className="mt-0.5 text-xs leading-snug text-slate-500">{stage.blurb}</div>
              </div>
            ))}
          </div>
        )}

        {job && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
              <div className="flex items-center justify-between overflow-x-auto pb-1">
                {STAGES.map((stage, i) => {
                  const done = i < currentStageIdx || job.stage === "done";
                  const active = i === currentStageIdx && isRunning;
                  const failed = job.stage === "failed" && i === currentStageIdx;
                  return (
                    <div key={stage.key} className="flex items-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            failed
                              ? "border-red-400 bg-red-50 text-red-600"
                              : done
                                ? "border-blue-600 bg-blue-600 text-white"
                                : active
                                  ? "border-blue-500 bg-blue-50 text-blue-600"
                                  : "border-slate-200 bg-white text-slate-300"
                          }`}
                        >
                          {done ? (
                            <Check className="h-4 w-4" />
                          ) : active ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <stage.icon className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <span
                          className={`whitespace-nowrap text-[10px] font-medium ${
                            done || active ? "text-slate-700" : "text-slate-400"
                          }`}
                        >
                          {stage.label}
                        </span>
                      </div>
                      {i < STAGES.length - 1 && (
                        <div className={`mx-1 h-0.5 w-6 sm:w-10 ${done ? "bg-blue-600" : "bg-slate-200"}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {isRunning && (
                <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  {job.candidateCount !== undefined && <span>{job.candidateCount} candidate sellers found</span>}
                  {job.verifiedCount !== undefined && <span>{job.verifiedCount} pages checked</span>}
                  {job.matchedCount !== undefined && <span>{job.matchedCount} confirmed matches</span>}
                </div>
              )}
            </div>

            {job.stage === "failed" && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <div className="font-semibold">Job failed after retries</div>
                  <div className="mt-0.5 text-red-600">{job.error}</div>
                </div>
              </div>
            )}

            {job.stage === "done" && (
              <>
                {results.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-12 text-center shadow-sm shadow-slate-200/50">
                    <PackageSearch className="h-8 w-8 text-slate-300" />
                    <div className="text-sm font-medium text-slate-600">No verified sellers found</div>
                    <div className="max-w-xs text-xs text-slate-400">
                      No candidate matched the requested product with a confirmable price.
                    </div>
                  </div>
                ) : (
                  <>
                    {bestPrice && (
                      <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
                        <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">Best price</div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-slate-900">
                            {bestPrice.price} {bestPrice.currency}
                          </span>
                          <span className="text-sm text-slate-500">at {bestPrice.storeName}</span>
                          {!bestPrice.priceVerified && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                              unverified
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                              <th className="px-4 py-3 font-semibold">Rank</th>
                              <th className="px-4 py-3 font-semibold">Store</th>
                              <th className="px-4 py-3 font-semibold">Product</th>
                              <th className="px-4 py-3 font-semibold">Price</th>
                              <th className="px-4 py-3 font-semibold">Availability</th>
                              <th className="px-4 py-3 font-semibold">Verified</th>
                              <th className="px-4 py-3 font-semibold">Link</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {results.map((r) => (
                              <tr key={r.rank} className="transition-colors hover:bg-slate-50">
                                <td className="px-4 py-3 font-semibold text-slate-900">{r.rank}</td>
                                <td className="px-4 py-3 text-slate-700">{r.storeName}</td>
                                <td className="px-4 py-3 text-slate-700">{r.productName}</td>
                                <td className="px-4 py-3 font-medium text-slate-900">
                                  {r.price !== null ? `${r.price} ${r.currency ?? ""}` : "Price unavailable"}
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                      r.availability === "in_stock"
                                        ? "bg-green-100 text-green-700"
                                        : r.availability === "out_of_stock"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    {r.availability.replace("_", " ")}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  {r.priceVerified ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <X className="h-4 w-4 text-slate-300" />
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <a
                                    href={r.productUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    View
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

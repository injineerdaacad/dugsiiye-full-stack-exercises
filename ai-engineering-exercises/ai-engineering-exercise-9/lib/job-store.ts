// In-memory store on `global` so it survives Next.js dev hot-reload — no database, jobs live only as long as the server runs.
import type { RankedResult } from "./types";

export type JobStage =
  | "queued"
  | "understanding"
  | "search"
  | "verification"
  | "matching"
  | "normalization"
  | "ranking"
  | "done"
  | "failed";

export type ComparisonJob = {
  id: string;
  query: string;
  stage: JobStage;
  candidateCount?: number;
  verifiedCount?: number;
  matchedCount?: number;
  results?: RankedResult[];
  error?: string;
  createdAt: string;
  updatedAt: string;
};

declare global {
  var _comparisonJobs: Map<string, ComparisonJob> | undefined;
}

function getJobs() {
  if (!global._comparisonJobs) global._comparisonJobs = new Map();
  return global._comparisonJobs;
}

export function createJob(id: string, query: string): ComparisonJob {
  const now = new Date().toISOString();
  const job: ComparisonJob = { id, query, stage: "queued", createdAt: now, updatedAt: now };
  getJobs().set(id, job);
  return job;
}

export function updateJob(id: string, patch: Partial<Omit<ComparisonJob, "id">>): void {
  const job = getJobs().get(id);
  if (!job) return;
  Object.assign(job, patch, { updatedAt: new Date().toISOString() });
}

export function getJob(id: string): ComparisonJob | undefined {
  return getJobs().get(id);
}

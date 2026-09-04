// kept on `global` so it survives Next.js dev hot-reload, same pattern as the MongoDB client cache in other exercises
export type JobStatus = "queued" | "outline" | "drafting" | "summarizing" | "done" | "failed";

export type ResearchJob = {
  id: string;
  topic: string;
  status: JobStatus;
  outline?: string[];
  article?: string;
  summary?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
};

export type DailyTip = {
  id: string;
  tip: string;
  createdAt: string;
};

declare global {
  var _researchJobs: Map<string, ResearchJob> | undefined;
  var _dailyTips: DailyTip[] | undefined;
}

function getJobs() {
  if (!global._researchJobs) global._researchJobs = new Map();
  return global._researchJobs;
}

function getTips() {
  if (!global._dailyTips) global._dailyTips = [];
  return global._dailyTips;
}

export function createJob(id: string, topic: string): ResearchJob {
  const now = new Date().toISOString();
  const job: ResearchJob = { id, topic, status: "queued", createdAt: now, updatedAt: now };
  getJobs().set(id, job);
  return job;
}

export function updateJob(id: string, patch: Partial<Omit<ResearchJob, "id">>): void {
  const job = getJobs().get(id);
  if (!job) return;
  Object.assign(job, patch, { updatedAt: new Date().toISOString() });
}

export function getJob(id: string): ResearchJob | undefined {
  return getJobs().get(id);
}

export function addDailyTip(tip: string): DailyTip {
  const entry: DailyTip = { id: crypto.randomUUID(), tip, createdAt: new Date().toISOString() };
  const tips = getTips();
  tips.unshift(entry);
  tips.length = Math.min(tips.length, 10); // keep the last 10
  return entry;
}

export function listDailyTips(): DailyTip[] {
  return getTips();
}

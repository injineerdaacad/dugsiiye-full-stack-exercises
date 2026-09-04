# AI Research Pipeline 🔬

A background AI agent pipeline: submit a research topic, get an instant response, and watch a
multi-step Gemini pipeline (outline → draft → summary) run in the background via Inngest while
the UI polls for live progress. Also includes a cron-scheduled function generating a daily
livestock tip, to demonstrate scheduled background work.

## Why Inngest here

AI agent calls are slow (each Gemini call in this pipeline takes several seconds) and can fail
transiently — Gemini genuinely does return `503 UNAVAILABLE` ("high demand") errors sometimes,
not a simulated failure. A plain API route would either time out or force the user to stare at
a spinner for the whole multi-step run. Inngest fixes both:

- The API route returns instantly with a job ID; the actual work happens in the background
- Each step (`step.run`) is checkpointed — if `write-draft` fails and retries, `generate-outline`
  is **not** re-run, its result is already saved
- Automatic retry with backoff on transient failures, for free
- `onFailure` fires only once every retry is exhausted, so the UI can show a real failure state
  instead of polling forever

## Tech stack

- Next.js (App Router) + TypeScript, no auth
- `@ai-sdk/google` for the Gemini chat model — same choice as other exercises in this series,
  for reliable multi-step tool/step calling
- `inngest` (SDK) + `inngest-cli` (local dev server) for background job orchestration
- No database — job status and daily tips live in an in-memory store (`lib/job-store.ts`), kept
  on `global` so it survives dev hot-reload

## Setup — running this project

Requires **two processes running at once**, plus a Gemini API key
([aistudio.google.com/apikey](https://aistudio.google.com/apikey)).

```bash
# 1. Install dependencies
npm install

# 2. Add your Gemini API key
cp .env.example .env
# then open .env and set API_KEY=your-gemini-api-key

# 3. Terminal A — the Next.js app
npm run dev

# 4. Terminal B — the Inngest Dev Server (orchestrates the background functions)
npm run inngest -- -u http://localhost:3000/api/inngest
```

Open [http://localhost:3000](http://localhost:3000) for the app, and
[http://localhost:8288](http://localhost:8288) for the Inngest dashboard (see every run, each
step, retries, and the cron schedule firing live).

If you changed the Next.js port (`npm run dev -- -p 3001`), point `-u` at that port instead.

### Gotchas not covered by Inngest's own docs

- **`INNGEST_DEV=1` is required in `.env` for local dev.** Without it, the SDK assumes cloud
  mode and every request to `/api/inngest` 500s with "In cloud mode but no signing key found" —
  already set in `.env.example`, but easy to lose if you copy this pattern elsewhere.
- **`createFunction`'s trigger goes inside the options object now.** Older docs/tutorials show
  `createFunction({ id }, { event: "..." }, handler)` (3 arguments). The installed version here
  takes only 2: `createFunction({ id, triggers: [{ event: "..." }] }, handler)`.

## The pipeline (`inngest/functions/research-pipeline.ts`)

1. `generate-outline` — Gemini produces 3-6 section titles (structured output via `generateObject`)
2. `write-draft` — Gemini expands the outline into a full markdown article
3. `step.sleep(2s)` — a courtesy pause before the last call, demonstrating scheduled delays
4. `write-summary` — Gemini writes a 2-sentence summary of the finished article

Each stage updates the job's status immediately, so the UI shows real progress rather than a
single "please wait."

## The cron job (`inngest/functions/daily-tip.ts`)

Runs every minute in this demo (`*/1 * * * *` — change to `0 6 * * *` for a real daily-at-6am
schedule) and asks Gemini for one short, practical livestock tip, stored for the UI's sidebar.
Confirms Inngest's scheduled-function support independent of any user action.

## Try it

- Submit "Camel milk trade in Somalia" and watch the outline appear within seconds, followed by
  the full article and summary a bit later
- Open the Inngest dashboard's Runs tab mid-request to see the three checkpointed steps
- Leave the app running for a couple of minutes and watch the Daily Tips sidebar update on its
  own from the cron function

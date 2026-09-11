# Shopping Price Comparison Agent 🛒

A 6-agent pipeline that finds, verifies, and ranks real sellers for a product: submit a query,
get an instant response, and watch Understanding → Search → Verification → Matching →
Normalization → Ranking run in the background via Inngest while the UI polls for live progress.

## The problem

A single LLM call asked "find me the best price for X" will happily make up sellers, prices,
and URLs. This pipeline never lets the model answer directly — every claim has to survive a
real web search, a real page fetch, and an explicit match/verify check before it's shown.

## Multi-agent architecture

- **Product Understanding** — parses the query into product/brand/model/variant/condition
- **Search** — generates several search queries, calls Serper, dedupes candidates by domain
- **Web Verification** — visits every candidate page directly (`fetch`, no headless browser),
  extracts price/availability/condition via a structured-output Gemini call per page; pages
  that fail to fetch (many retailers block plain server-side requests) fall back to the search
  snippet marked `priceVerified: false`, never presented as a confirmed price
- **Product Matching** — judges every verified result against the requested product, rejecting
  accessories, wrong variants, and wrong condition
- **Normalization** — converts prices to a common USD figure using a **fixed exchange-rate
  table**, not the LLM's own "memory" of exchange rates (which goes stale and can't be trusted)
- **Ranking** — sorts by verified price, lowest first, capped at 10

Normalization and Ranking are plain deterministic functions (`lib/finalize-results.ts`), not
LLM agents — they never needed reasoning, just math and a sort.

## Tech stack

- Next.js (App Router) + TypeScript, no auth, no database
- `@inngest/agent-kit` for the Agent/Tool/state abstractions, with `@inngest/agent-kit`'s native
  `gemini()` adapter for each agent's reasoning turn
- `@ai-sdk/google` (Vercel AI SDK) separately, for the small structured-output calls tool
  handlers make internally (e.g. per-page price extraction) — not part of any agent's own turn
- `inngest` (SDK) + `inngest-cli` (local dev server) for background job orchestration
- Serper API for web search
- In-memory job store (`lib/job-store.ts`), kept on `global` so it survives dev hot-reload

## Setup — running this project

Requires **two processes running at once**, plus a Gemini key
([aistudio.google.com/apikey](https://aistudio.google.com/apikey)) and a Serper key
([serper.dev](https://serper.dev), free tier).

```bash
# 1. Install dependencies
npm install

# 2. Add your API keys
cp .env.example .env
# then set GEMINI_API_KEY and SERPER_API_KEY in .env

# 3. Terminal A — the Next.js app
npm run dev -- -p 3009

# 4. Terminal B — the Inngest Dev Server
npm run inngest -- -u http://localhost:3009/api/inngest
```

Open [http://localhost:3009](http://localhost:3009) for the app, and
[http://localhost:8288](http://localhost:8288) for the Inngest dashboard.

### Gotchas found the hard way

- **`INNGEST_DEV=1` is required in `.env`** for local dev — without it every request to
  `/api/inngest` 500s with "In cloud mode but no signing key found."
- **Gemini's `thought_signature` doesn't round-trip through AgentKit's Network history replay.**
  Running multiple agents inside a `createNetwork(...)` router causes a real `400` on the second
  agent's turn — AgentKit's Gemini adapter doesn't echo back the signature Gemini requires on
  replayed function-call turns. There's no way to disable Gemini's "thinking" to avoid this
  (tested `thinkingBudget`/`thinkingLevel` — every value still attaches a signature).
- **`createNetwork`'s own step-id bookkeeping breaks down on long runs.** Even after working
  around the signature issue, sufficiently long pipelines (many candidates to verify) hit a real
  Inngest error — `"Could not find step ..."` — on whatever happens to be the *last* step of the
  run, reproducible even with a fully synchronous, AgentKit-free `step.run()`. This turned out to
  be an infrastructure-level Inngest dev-server bug tied to total step count/duration, not
  anything about the step's content. **Fix:** this project doesn't use `createNetwork` at all —
  each agent is called directly (`agent.run(query, { state, step })`), driven by plain sequential
  code in the Inngest function instead of a `router` callback, and the final normalize/rank steps
  run as plain function calls (no `step.run()` wrapper) since they're pure and don't need
  durability. Confirmed fixed by reproducing the exact failing query end-to-end afterward.

## Try it

- "MacBook Pro 16-inch M4 Max" or "Sony WH-1000XM5 headphones new" — watch all 6 stages
  complete and a ranked table of verified sellers appear, cheapest first
- Note the `Verified` column: pages that couldn't be fetched (blocked, timed out) are excluded
  or shown with a lower-confidence result rather than a fabricated price

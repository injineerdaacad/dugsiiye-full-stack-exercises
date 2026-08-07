# Dad Jokes Tool

Next.js + AI SDK chat app for random jokes, keyword search, and thumbs up/down ratings —
backed by icanhazdadjoke.com with a local fallback pool, all persisted to MongoDB.

## Setup

```bash
npm install
cp .env.example .env   # set API_KEY (Gemini) and Mongo connection info
npm run dev
```

Needs a local MongoDB running on `mongodb://localhost:27017` (no auth) by default.
No key needed for icanhazdadjoke.com.

## Tools

- `getRandomJoke` — category `dad` hits the live API (falls back to a local joke if the
  API fails); `programming`/`general` are served from a local curated pool, since
  icanhazdadjoke only has dad jokes
- `searchJokes` — searches the live API plus everything previously cached in MongoDB
- `rateJoke` — thumbs up/down by joke id, persisted as vote counts

Try: "Tell me a dad joke", "Give me a programming joke", "Search jokes about cats" — then
click 👍/👎 on any joke to rate it.

## Notes

- Uses `@ai-sdk/google` directly, not the OpenAI-compat layer — see `database-chat-tool`'s
  README for why.
- Every joke (API or local) is upserted into MongoDB on first fetch, so ratings and search
  work even after the API is unavailable.
- Rating buttons just send a natural-language message ("Rate joke X thumbs up") — the model
  turns that into a `rateJoke` tool call, keeping everything on the same chat pipeline.

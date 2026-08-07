# Database Chat Tool

Next.js + AI SDK chat app that converts natural-language questions into MongoDB queries
against a movies/users/reviews dataset.

## Setup

```bash
npm install
cp .env.example .env   # set API_KEY (Gemini) and Mongo connection info
npm run seed            # seeds 15 movies, 8 users, 10 reviews
npm run dev
```

Needs a local MongoDB running on `mongodb://localhost:27017` (no auth) by default.

## Tools

- `queryMovies` — filter by genre, rating range, year, director
- `queryUsers` — filter by age range, favorite genre
- `countMoviesByGenre` — aggregation
- `queryReviews` — filter by movie title, minimum rating

Try: "Show me all sci-fi movies", "Find users over 25", "Movies with rating above 8.5",
"Count movies by genre".

## Notes

- Uses `@ai-sdk/google` directly (not the OpenAI-compat layer) — Gemini's
  `/chat/completions` endpoint requires a `thought_signature` to be echoed back on every
  replayed function call, which neither `@ai-sdk/openai` nor `@ai-sdk/openai-compatible`
  round-trip, so multi-step tool calls 400 through them.
- Each tool wraps its DB call in try/catch and returns `{ success, error }` on failure
  instead of throwing, so the model can report problems instead of crashing the request.
- `_id` is excluded from all query projections — MongoDB's `ObjectId` isn't
  JSON-serializable in the shape the SDK expects when replaying tool results.

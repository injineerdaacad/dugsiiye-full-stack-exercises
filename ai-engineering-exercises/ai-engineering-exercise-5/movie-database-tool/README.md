# Movie Database Tool

Next.js + AI SDK chat app that fetches real movie data from OMDb — details, partial-title
search, and genre/year recommendations — caching results in MongoDB.

## Setup

```bash
npm install
cp .env.example .env   # set API_KEY (Gemini), Mongo connection info, and OMDB_API_KEY
npm run dev
```

Get a free OMDb key (1000 requests/day) at https://www.omdbapi.com/apikey.aspx.
Needs a local MongoDB running on `mongodb://localhost:27017` (no auth) by default.

## Tools

- `searchMovieByTitle` — exact title (+ optional year) lookup, cached after first fetch
- `searchMoviesPartial` — fuzzy/partial title search
- `getMovieRecommendations` — checks the cache for genre/year matches first, falls back
  to an OMDb search to seed new ones

Try: "Tell me about Inception", "Find movies like Matrix", "Recommend sci-fi movies from 2020".

## Notes

- Uses `@ai-sdk/google` directly, not the OpenAI-compat layer — see `database-chat-tool`'s
  README for why (Gemini's `thought_signature` requirement isn't round-tripped by the
  OpenAI-shaped providers).
- OMDb's "Movie not found" response is handled explicitly and returned to the model as a
  structured error rather than throwing.
- Each OMDb fetch has an 8s timeout via `AbortController`.

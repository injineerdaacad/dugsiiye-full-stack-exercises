# Smart Content Assistant

CLI that generates a streamed blog post outline, summarizes it in 2 sentences, then answers
follow-up questions about the topic. Uses the OpenAI SDK against any OpenAI-compatible
provider — configured entirely through `.env`, nothing provider-specific in the code.

## Setup

```bash
npm install
cp .env.example .env   # set API_KEY, BASE_URL, TEXT_MODEL for your provider
npm run dev
```

Leave `BASE_URL` unset to use OpenAI directly, or point it at any OpenAI-compatible
endpoint (e.g. Gemini's `https://generativelanguage.googleapis.com/v1beta/openai/`).

## Notes

- Bonus temperature control: choose "creative" (temperature 1.0) or "factual" (temperature 0.2)
  content style at the start of the run.
- Bonus cost tracking: token usage from each response is priced per `TEXT_MODEL` and printed
  as a total once the session ends.
- `npm run build && npm start` compiles to `dist/` and runs the compiled output.

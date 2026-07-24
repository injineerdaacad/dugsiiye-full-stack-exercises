# Smart Content Assistant

CLI that generates a streamed blog post outline, summarizes it in 2 sentences, then answers
follow-up questions about the topic. Uses the OpenAI SDK pointed at Gemini's OpenAI-compatible
endpoint (no OpenAI platform key required).

## Setup

```bash
npm install
cp .env.example .env   # add your GEMINI_API_KEY
npm run dev
```

## Notes

- Bonus temperature control: choose "creative" (temperature 1.0) or "factual" (temperature 0.2)
  content style at the start of the run.
- `npm run build && npm start` compiles to `dist/` and runs the compiled output.

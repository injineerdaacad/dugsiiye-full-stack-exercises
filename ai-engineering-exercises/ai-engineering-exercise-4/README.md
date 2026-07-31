# AI Content Studio

CLI that takes one or more topics and produces a complete content suite for each: an article,
a summary, social posts, a header image, a thumbnail, and narration audio.

Text and images go through the OpenAI SDK (provider-agnostic, via `.env`). Narration always
goes through Gemini's native REST API directly — no OpenAI-compatible provider exposes a TTS
route yet.

## Setup

```bash
npm install
cp .env.example .env   # set API_KEY, BASE_URL, TEXT_MODEL, IMAGE_MODEL, TTS_MODEL
npm run dev
```

Enter one topic, or several separated by commas, to batch-process them in one run.

## Output

Each topic writes to `output/<topic-slug>/`:

- `article.md`, `summary.txt`, `social-posts.json`
- `header.png` (1792x1024), `thumbnail.png` (1024x1024)
- `narration.wav` — summary read aloud in a tone the content step chose for it
- `manifest.json` — per-step status (ok/failed), timing, cost, and any error

## Quality control

Each of the 5 steps (content, header, thumbnail, narration) runs independently and is wrapped
in its own try/catch — one step failing (e.g. an image quota error) doesn't stop the others,
and a whole topic failing doesn't stop the rest of the batch. Status per step is recorded in
`manifest.json`.

## Notes

- Cost tracking: per-step cost recorded in each manifest; a total is printed once per topic
  and once for the whole batch at the end.
- Performance monitoring: each step's duration (ms) is recorded in `manifest.json`.
- `npm run build && npm start` compiles to `dist/` and runs the compiled output.

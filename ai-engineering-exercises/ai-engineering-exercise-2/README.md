# Smart Image Generator

CLI that takes a theme, suggests enhanced prompts, then generates images across every
combination of size × style. Uses the OpenAI SDK against any OpenAI-compatible provider —
configured entirely through `.env`, nothing provider-specific in the code.

3 sizes (square, landscape, portrait) × 2 styles (vivid, natural — applied via prompt text,
since not every provider supports a native `style` param) = 6 images per run.

## Setup

```bash
npm install
cp .env.example .env   # set API_KEY, BASE_URL, TEXT_MODEL, IMAGE_MODEL for your provider
npm run dev
```

Leave `BASE_URL` unset to use OpenAI directly, or point it at any OpenAI-compatible
endpoint (e.g. Gemini's `https://generativelanguage.googleapis.com/v1beta/openai/`).

**Note:** some providers give image models zero free-tier quota (e.g. Gemini) — the API
key needs billing enabled, or every generation call returns a 429. Text-only calls (chat
completions, the prompt-suggestion step) are usually free-tier friendly.

## Output

Each run writes to `output/<theme-slug>/`:

- one `.png` per size/style combination
- `metadata.json` — prompt, size, style, cost, and any errors for every combination
- `gallery.html` — a self-contained grid of every image, open it directly in a browser

## Notes

- Bonus prompt enhancement: the assistant suggests 3 prompt variants from your theme before
  generating.
- Bonus cost tracking: an upfront cost estimate before you confirm, and a single total once
  the run finishes — priced from `IMAGE_MODEL_COST` in `.env`.
- `npm run build && npm start` compiles to `dist/` and runs the compiled output.

# TTS Challenge

CLI that takes a topic, writes a short two-speaker conversation with a distinct emotion/instruction
per line, then generates each line as its own audio file.

Text generation goes through the OpenAI SDK (provider-agnostic, via `.env`). Speech generation
always goes through Gemini's native REST API directly (`src/tts.ts`) — no OpenAI-compatible
provider exposes a TTS route yet, so this part isn't swappable the way the other exercises are.

## Setup

```bash
npm install
cp .env.example .env   # add your Gemini API_KEY
npm run dev
```

## Output

Each run writes to `output/<topic-slug>/`:

- one `.wav` per line of dialogue (e.g. `1_Alex.wav`, `2_Sam.wav`, ...)
- `transcript.json` — speaker, emotion, line, and filename for every turn

## Notes

- Two fixed speakers, "Alex" and "Sam", each assigned a distinct voice (`Puck` / `Kore`).
- Emotion is applied via a natural-language instruction prefix (`"Say cheerfully: ..."`),
  since that's how Gemini's TTS API reads tone/style cues.
- Cost tracking: total cost (script + audio tokens) printed once when the run finishes.
- `npm run build && npm start` compiles to `dist/` and runs the compiled output.

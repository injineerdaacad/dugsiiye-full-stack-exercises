import { mkdir, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import {
  client,
  TEXT_MODEL,
  INPUT_TOKEN_RATE,
  OUTPUT_TOKEN_RATE,
  IMAGE_MODEL,
  API_KEY,
  TTS_BASE_URL,
  TTS_MODEL,
  TTS_INPUT_RATE,
  TTS_OUTPUT_RATE,
} from "./client.js";

const rl = createInterface({ input: stdin, output: stdout });
const SAMPLE_RATE = 24000;

async function ask(question: string) {
  const answer = await rl.question(question);
  return answer.trim();
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "topic";
}

function pcmToWav(pcm: Buffer) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

async function synthesizeSpeech(text: string, voice: string) {
  const response = await fetch(`${TTS_BASE_URL}/models/${TTS_MODEL}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
      },
    }),
  });

  if (!response.ok) throw new Error(`TTS request failed: ${response.status} ${await response.text()}`);

  const data = await response.json();
  const base64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64) throw new Error("No audio returned");

  return {
    wav: pcmToWav(Buffer.from(base64, "base64")),
    inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
    outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
  };
}

type Content = {
  article: string;
  summary: string;
  socialPosts: string[];
  narrationTone: string;
};

async function generateContent(topic: string): Promise<{ content: Content; cost: number }> {
  const response = await client.chat.completions.create({
    model: TEXT_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a content studio assistant. Given a topic, reply with ONLY a JSON object, no markdown fences, shaped like: " +
          '{"article":"3-5 paragraph article","summary":"2 sentence summary","socialPosts":["post1","post2","post3"],' +
          '"narrationTone":"a short tone instruction for a voice actor, e.g. warm and informative"}',
      },
      { role: "user", content: topic },
    ],
  });

  const usage = response.usage;
  const cost = usage ? usage.prompt_tokens * INPUT_TOKEN_RATE + usage.completion_tokens * OUTPUT_TOKEN_RATE : 0;
  const text = response.choices[0]?.message?.content ?? "{}";
  return { content: JSON.parse(text.replace(/```json|```/g, "").trim()), cost };
}

async function generateImage(prompt: string, size: "1024x1024" | "1792x1024") {
  const response = await client.images.generate({
    model: IMAGE_MODEL.name,
    prompt,
    size,
    n: 1,
    response_format: "b64_json",
  });
  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image returned");
  return Buffer.from(b64, "base64");
}

type StepResult = { status: "ok" | "failed"; ms: number; cost: number; error: string | null };

async function runStep<T>(fn: () => Promise<{ result: T; cost: number }>): Promise<StepResult & { value: T | null }> {
  const start = Date.now();
  try {
    const { result, cost } = await fn();
    return { status: "ok", ms: Date.now() - start, cost, error: null, value: result };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return { status: "failed", ms: Date.now() - start, cost: 0, error, value: null };
  }
}

async function processTopic(topic: string) {
  console.log(`\n=== ${topic} ===`);
  const outDir = `output/${slugify(topic)}`;
  await mkdir(outDir, { recursive: true });

  const steps: Record<string, StepResult> = {};
  let totalCost = 0;

  console.log("  writing content...");
  const contentStep = await runStep(async () => {
    const { content, cost } = await generateContent(topic);
    return { result: content, cost };
  });
  steps.content = contentStep;
  totalCost += contentStep.cost;

  if (!contentStep.value) {
    console.log(`  content failed: ${contentStep.error} — skipping topic`);
    return { topic, outDir, steps, totalCost };
  }
  const content = contentStep.value;

  await writeFile(`${outDir}/article.md`, content.article);
  await writeFile(`${outDir}/summary.txt`, content.summary);
  await writeFile(`${outDir}/social-posts.json`, JSON.stringify(content.socialPosts, null, 2));

  console.log("  designing header image...");
  const headerStep = await runStep(async () => {
    const buf = await generateImage(`Blog header image for an article about: ${content.summary}`, "1792x1024");
    await writeFile(`${outDir}/header.png`, buf);
    return { result: true, cost: IMAGE_MODEL.costPerImage };
  });
  steps.header = headerStep;
  totalCost += headerStep.cost;
  console.log(headerStep.status === "ok" ? "  saved header.png" : `  header failed: ${headerStep.error}`);

  console.log("  designing thumbnail...");
  const thumbnailStep = await runStep(async () => {
    const buf = await generateImage(`Thumbnail image for an article about: ${content.summary}`, "1024x1024");
    await writeFile(`${outDir}/thumbnail.png`, buf);
    return { result: true, cost: IMAGE_MODEL.costPerImage };
  });
  steps.thumbnail = thumbnailStep;
  totalCost += thumbnailStep.cost;
  console.log(thumbnailStep.status === "ok" ? "  saved thumbnail.png" : `  thumbnail failed: ${thumbnailStep.error}`);

  console.log("  recording narration...");
  const narrationStep = await runStep(async () => {
    const { wav, inputTokens, outputTokens } = await synthesizeSpeech(
      `Say in a ${content.narrationTone} tone: ${content.summary}`,
      "Kore",
    );
    await writeFile(`${outDir}/narration.wav`, wav);
    return { result: true, cost: inputTokens * TTS_INPUT_RATE + outputTokens * TTS_OUTPUT_RATE };
  });
  steps.narration = narrationStep;
  totalCost += narrationStep.cost;
  console.log(narrationStep.status === "ok" ? "  saved narration.wav" : `  narration failed: ${narrationStep.error}`);

  await writeFile(`${outDir}/manifest.json`, JSON.stringify({ topic, steps, totalCost }, null, 2));
  return { topic, outDir, steps, totalCost };
}

async function main() {
  const input = await ask('Topic(s), comma-separated for batch (e.g. "Somali coffee culture, Mogadishu street food"): ');
  const topics = input.split(",").map((t) => t.trim()).filter(Boolean);

  const results = [];
  for (const topic of topics) {
    try {
      results.push(await processTopic(topic));
    } catch (err) {
      console.log(`  topic failed entirely: ${err instanceof Error ? err.message : err}`);
    }
  }

  const totalCost = results.reduce((sum, r) => sum + r.totalCost, 0);
  console.log("\n=== Summary ===");
  for (const r of results) {
    const ok = Object.values(r.steps).filter((s) => s.status === "ok").length;
    console.log(`  ${r.topic}: ${ok}/${Object.keys(r.steps).length} steps ok, $${r.totalCost.toFixed(4)}, ${r.outDir}/`);
  }
  console.log(`Total cost: $${totalCost.toFixed(4)}`);

  rl.close();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  rl.close();
  process.exit(1);
});

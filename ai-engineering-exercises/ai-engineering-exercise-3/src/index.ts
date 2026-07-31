import { mkdir, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import {
  client,
  TEXT_MODEL,
  INPUT_TOKEN_RATE,
  OUTPUT_TOKEN_RATE,
  API_KEY,
  TTS_BASE_URL,
  TTS_MODEL,
  TTS_INPUT_RATE,
  TTS_OUTPUT_RATE,
} from "./client.js";

const rl = createInterface({ input: stdin, output: stdout });
let totalCost = 0;
const SAMPLE_RATE = 24000;

async function ask(question: string) {
  const answer = await rl.question(question);
  return answer.trim();
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "conversation";
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

  if (!response.ok) {
    throw new Error(`TTS request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const base64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64) throw new Error("No audio returned");

  return {
    wav: pcmToWav(Buffer.from(base64, "base64")),
    inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
    outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
  };
}

type Turn = { speaker: string; emotion: string; line: string };

async function generateScript(topic: string): Promise<Turn[]> {
  const response = await client.chat.completions.create({
    model: TEXT_MODEL,
    messages: [
      {
        role: "system",
        content:
          'Write a short conversation between exactly two speakers, "Mohamed" and "Zainab", about the given topic. ' +
          "5-6 turns total, alternating speakers. Each turn needs a one or two word emotion/tone instruction " +
          '(e.g. "cheerfully", "nervously", "sarcastically"). Reply with ONLY a JSON array, no markdown fences, ' +
          'shaped like: [{"speaker":"Mohamed","emotion":"cheerfully","line":"..."}]',
      },
      { role: "user", content: topic },
    ],
  });

  const usage = response.usage;
  if (usage) totalCost += usage.prompt_tokens * INPUT_TOKEN_RATE + usage.completion_tokens * OUTPUT_TOKEN_RATE;

  const text = response.choices[0]?.message?.content ?? "[]";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

const VOICES: Record<string, string> = { Mohamed: "Puck", Zainab: "Kore" };

async function main() {
  const topic = await ask('Conversation topic (e.g. "Two Friends Debating Somali Tea vs Coffee"): ');

  console.log("\nWriting script...\n");
  const script = await generateScript(topic);
  script.forEach((turn, i) => console.log(`  ${i + 1}. ${turn.speaker} (${turn.emotion}): ${turn.line}`));

  const outDir = `output/${slugify(topic)}`;
  await mkdir(outDir, { recursive: true });

  console.log("\nGenerating audio...\n");
  const files: { speaker: string; emotion: string; line: string; file: string }[] = [];

  for (let i = 0; i < script.length; i++) {
    const turn = script[i];
    const voice = VOICES[turn.speaker] ?? "Kore";
    const fileName = `${i + 1}_${turn.speaker}.wav`;

    const { wav, inputTokens, outputTokens } = await synthesizeSpeech(`Say ${turn.emotion}: ${turn.line}`, voice);
    totalCost += inputTokens * TTS_INPUT_RATE + outputTokens * TTS_OUTPUT_RATE;

    await writeFile(`${outDir}/${fileName}`, wav);
    files.push({ speaker: turn.speaker, emotion: turn.emotion, line: turn.line, file: fileName });
    console.log(`  saved ${fileName}`);
  }

  await writeFile(`${outDir}/transcript.json`, JSON.stringify({ topic, turns: files }, null, 2));

  console.log(`\nDone. ${files.length} audio files in ${outDir}/`);
  console.log(`Total cost: $${totalCost.toFixed(5)}`);
  rl.close();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  rl.close();
  process.exit(1);
});

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import type { ChatCompletionMessageParam as Message } from "openai/resources/chat/completions";
import { client, MODEL, INPUT_TOKEN_RATE, OUTPUT_TOKEN_RATE } from "./client.js";

const rl = createInterface({ input: stdin, output: stdout });

let totalCost = 0;

async function ask(question: string) {
  const answer = await rl.question(question);
  return answer.trim();
}

async function streamReply(messages: Message[], temperature: number) {
  const stream = await client.chat.completions.create({
    model: MODEL,
    messages,
    temperature,
    stream: true,
    stream_options: { include_usage: true },
  });

  let reply = "";
  let usage: { prompt_tokens: number; total_tokens: number } | undefined;
  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content ?? "";
    stdout.write(text);
    reply += text;
    if (chunk.usage) usage = chunk.usage;
  }
  stdout.write("\n");

  if (usage) {
    const outputTokens = usage.total_tokens - usage.prompt_tokens;
    const cost = usage.prompt_tokens * INPUT_TOKEN_RATE + outputTokens * OUTPUT_TOKEN_RATE;
    totalCost += cost;
    console.log(`Tokens used: ${usage.total_tokens.toLocaleString()} | Estimated cost: $${cost.toFixed(4)}`);
  }
  return reply;
}

async function main() {
  const topic = await ask('Topic for the blog post (e.g. "Top 10 places to visit in Somalia"): ');
  const style = await ask("Creative or Factual? (C/F) [F] ");
  const temperature = style.toLowerCase() === "c" ? 1.0 : 0.2;

  console.log("\nGenerating outline...\n");
  const outline = await streamReply(
    [
      { role: "system", content: "You are a content strategist who writes clear blog post outlines." },
      { role: "user", content: `Create a blog post outline about: ${topic}` },
    ],
    temperature,
  );

  console.log("\nSummary...\n");
  const summary = await streamReply(
    [
      { role: "system", content: "Summarize the outline in exactly 2 sentences." },
      { role: "user", content: outline },
    ],
    0.3,
  );

  console.log("\nAsk follow-up questions (type 'exit' to quit)\n");
  const history: Message[] = [
    { role: "system", content: `Topic: "${topic}"\n\nOutline:\n${outline}\n\nSummary: ${summary}` },
  ];

  while (true) {
    const question = await ask("\nYour question: ");
    if (!question || question.toLowerCase() === "exit") break;

    history.push({ role: "user", content: question });
    const answer = await streamReply(history, temperature);
    history.push({ role: "assistant", content: answer });
  }

  console.log(`\nTotal cost: $${totalCost.toFixed(5)}`);
  rl.close();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  rl.close();
  process.exit(1);
});

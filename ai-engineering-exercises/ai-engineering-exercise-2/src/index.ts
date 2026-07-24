import { mkdir, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { client, TEXT_MODEL, IMAGE_MODEL } from "./client.js";

const rl = createInterface({ input: stdin, output: stdout });

async function ask(question: string) {
  const answer = await rl.question(question);
  return answer.trim();
}

const SIZES = [
  { label: "square", value: "1024x1024" as const },
  { label: "landscape", value: "1792x1024" as const },
  { label: "portrait", value: "1024x1792" as const },
];


const STYLES = [
  { label: "vivid", suffix: "Render in a vivid, vibrant, highly saturated style." },
  { label: "natural", suffix: "Render in a natural, photorealistic, true-to-life style." },
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "theme";
}

async function suggestPrompts(theme: string) {
  const response = await client.chat.completions.create({
    model: TEXT_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You improve short image-generation prompts. Given a theme, reply with 3 short, vivid, detailed prompts, one per line, no numbering.",
      },
      { role: "user", content: theme },
    ],
  });

  return (response.choices[0]?.message?.content ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

type ImageResult = {
  size: string;
  sizeLabel: string;
  style: string;
  prompt: string;
  cost: number;
  file: string | null;
  error: string | null;
};

async function generateImage(prompt: string, size: (typeof SIZES)[number]["value"]) {
  const response = await client.images.generate({
    model: IMAGE_MODEL.name,
    prompt,
    size,
    n: 1,
    response_format: "b64_json",
  });
  return response.data?.[0]?.b64_json ?? null;
}

async function main() {
  const theme = await ask('Image theme (e.g. "A man in a suit walking through Mogadishu, Somalia"): ');

  console.log("\nGenerating 3 enhanced prompt ideas...\n");
  const suggestions = await suggestPrompts(theme);
  suggestions.forEach((line, i) => console.log(`  [${i + 1}] ${line}`));

  const choice = await ask("\nPick a prompt above, or press Enter to use your theme as-is: ");
  const basePrompt = suggestions[Number(choice) - 1] ?? theme;

  const combos = SIZES.length * STYLES.length;
  const estimatedCost = IMAGE_MODEL.costPerImage * combos;
  console.log(`\nThis generates ${combos} images. Estimated cost: $${estimatedCost.toFixed(2)}`);

  const confirm = await ask("Proceed? (Y/n) ");
  if (confirm.toLowerCase() === "n") {
    console.log("Cancelled — no charges made.");
    rl.close();
    return;
  }

  const outDir = `output/${slugify(theme)}`;
  await mkdir(outDir, { recursive: true });

  const results: ImageResult[] = [];
  let totalCost = 0;

  for (const size of SIZES) {
    for (const style of STYLES) {
      const prompt = `${basePrompt} ${style.suffix}`;
      const fileName = `${size.label}_${style.label}.png`;
      console.log(`\nGenerating: ${size.label} / ${style.label}...`);

      try {
        const b64 = await generateImage(prompt, size.value);
        if (!b64) throw new Error("No image returned");

        await writeFile(`${outDir}/${fileName}`, Buffer.from(b64, "base64"));
        totalCost += IMAGE_MODEL.costPerImage;

        results.push({
          size: size.value,
          sizeLabel: size.label,
          style: style.label,
          prompt,
          cost: IMAGE_MODEL.costPerImage,
          file: fileName,
          error: null,
        });
        console.log(`  saved ${fileName}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        results.push({
          size: size.value,
          sizeLabel: size.label,
          style: style.label,
          prompt,
          cost: 0,
          file: null,
          error: message,
        });
        console.log(`  failed: ${message}`);
      }
    }
  }

  await writeFile(`${outDir}/metadata.json`, JSON.stringify({ theme, basePrompt, totalCost, results }, null, 2));
  await writeFile(`${outDir}/gallery.html`, buildGalleryHtml(theme, results));

  console.log(`\nDone. ${results.filter((r) => r.file).length}/${results.length} images generated.`);
  console.log(`Total cost: $${totalCost.toFixed(3)}`);
  console.log(`Gallery: ${outDir}/gallery.html`);

  rl.close();
}

function buildGalleryHtml(theme: string, results: ImageResult[]) {
  const cards = results
    .map((r) =>
      r.file
        ? `<figure>
      <img src="${r.file}" alt="${r.sizeLabel} ${r.style}" />
      <figcaption>${r.sizeLabel} / ${r.style}<br>$${r.cost.toFixed(3)}</figcaption>
    </figure>`
        : `<figure class="failed">
      <div class="placeholder">failed</div>
      <figcaption>${r.sizeLabel} / ${r.style}<br>${r.error}</figcaption>
    </figure>`,
    )
    .join("\n");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Gallery: ${theme}</title>
<style>
  body { font-family: sans-serif; background: #111; color: #eee; padding: 2rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
  figure { margin: 0; background: #1c1c1c; border-radius: 8px; padding: 0.75rem; }
  img { width: 100%; border-radius: 4px; display: block; }
  .placeholder { aspect-ratio: 1; background: #333; display: flex; align-items: center; justify-content: center; border-radius: 4px; }
  figcaption { margin-top: 0.5rem; font-size: 0.85rem; line-height: 1.4; }
</style>
</head>
<body>
<h1>${theme}</h1>
<div class="grid">
${cards}
</div>
</body>
</html>`;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  rl.close();
  process.exit(1);
});

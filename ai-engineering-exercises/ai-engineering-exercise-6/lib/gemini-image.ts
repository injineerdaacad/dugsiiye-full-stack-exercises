const apiKey = process.env.GEMINI_API_KEY;
const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image";

export async function generateGeminiImage(prompt: string): Promise<{ mimeType: string; base64: string }> {
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY. Set it in .env.");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini image generation failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: { inlineData?: { mimeType: string; data: string } }) => p.inlineData);

  if (!imagePart) {
    throw new Error("Gemini did not return an image for this prompt.");
  }

  return {
    mimeType: imagePart.inlineData.mimeType,
    base64: imagePart.inlineData.data,
  };
}

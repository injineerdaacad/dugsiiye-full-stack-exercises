const apiKey = process.env.SERPER_API_KEY;
if (!apiKey) {
  throw new Error("Missing SERPER_API_KEY. Copy .env.example to .env and set your key.");
}

export type SerperResult = {
  title: string;
  link: string;
  snippet: string;
};

export async function serperSearch(query: string): Promise<SerperResult[]> {
  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query }),
  });

  if (!res.ok) {
    throw new Error(`Serper search failed (${res.status}) for query "${query}"`);
  }

  const data = await res.json();
  const organic: SerperResult[] = (data.organic ?? []).map((r: SerperResult) => ({
    title: r.title,
    link: r.link,
    snippet: r.snippet,
  }));
  return organic;
}

export type Category = "dad" | "programming" | "general";

export const LOCAL_JOKES: Record<Category, { id: string; text: string }[]> = {
  dad: [
    { id: "local-dad-1", text: "Why don't skeletons fight each other? They don't have the guts." },
    { id: "local-dad-2", text: "I'm reading a book about anti-gravity. It's impossible to put down." },
    { id: "local-dad-3", text: "Why did the scarecrow win an award? He was outstanding in his field." },
  ],
  programming: [
    { id: "local-prog-1", text: "Why do programmers prefer dark mode? Because light attracts bugs." },
    { id: "local-prog-2", text: "There are 10 types of people: those who understand binary, and those who don't." },
    { id: "local-prog-3", text: "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'" },
  ],
  general: [
    { id: "local-gen-1", text: "I told my computer I needed a break, and it said no problem — it needed one too." },
    { id: "local-gen-2", text: "Why don't scientists trust atoms? Because they make up everything." },
    { id: "local-gen-3", text: "What do you call fake spaghetti? An impasta." },
  ],
};

export async function fetchDadJoke(): Promise<{ id: string; text: string } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    return { id: data.id, text: data.joke };
  } catch {
    return null;
  }
}

export async function searchDadJokes(term: string): Promise<{ id: string; text: string }[] | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`https://icanhazdadjoke.com/search?term=${encodeURIComponent(term)}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    return (data.results ?? []).map((r: { id: string; joke: string }) => ({ id: r.id, text: r.joke }));
  } catch {
    return null;
  }
}

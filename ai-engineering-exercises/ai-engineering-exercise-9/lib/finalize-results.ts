import type { MatchedResult, NormalizedResult, RankedResult } from "./types";

// Fixed approximate rates — not asking the LLM, since a hallucinated rate would silently corrupt the ranking.
const USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  CAD: 0.73,
  AUD: 0.65,
  JPY: 0.0067,
  INR: 0.012,
  CNY: 0.14,
};

export function normalizePrices(matched: MatchedResult[]): NormalizedResult[] {
  return matched
    .filter((m) => m.isMatch)
    .map((item) => {
      if (item.price === null) return { ...item, priceNumericUsd: null };
      const currency = (item.currency ?? "USD").toUpperCase();
      const rate = USD_RATES[currency];
      return { ...item, priceNumericUsd: rate ? item.price * rate : null };
    });
}

export function rankResults(normalized: NormalizedResult[]): RankedResult[] {
  const comparable = normalized.filter((r) => r.priceNumericUsd !== null);
  const sorted = [...comparable].sort((a, b) => a.priceNumericUsd! - b.priceNumericUsd!);
  return sorted.slice(0, 10).map((item, i) => ({ ...item, rank: i + 1 }));
}

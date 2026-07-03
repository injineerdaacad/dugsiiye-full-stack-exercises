"use client";

import { useEffect, useState } from "react";

function relative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);

  if (s < 60) return "just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d === 1) return "yesterday";
  if (d < 30) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export function TimeAgo({ date }: { date: string }) {
  const [label, setLabel] = useState(relative(date));

  useEffect(() => {
    const timer = setInterval(() => setLabel(relative(date)), 60_000);
    return () => clearInterval(timer);
  }, [date]);

  return (
    <time
      dateTime={date}
      title={new Date(date).toLocaleString()}
      className="text-xs text-slate-400 whitespace-nowrap"
    >
      {label}
    </time>
  );
}

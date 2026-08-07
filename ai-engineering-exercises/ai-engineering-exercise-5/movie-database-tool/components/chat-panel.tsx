"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ToolResult, type ToolPart } from "@/components/tool-result";

export function ChatPanel() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex h-screen flex-col bg-zinc-50">
      <div className="border-b bg-white py-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">🎬 Movie Database Tool</h1>
        <p className="text-sm text-zinc-500">Search movies, get details, and find recommendations (via OMDb)</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
              Try: &quot;Tell me about Inception&quot;, &quot;Find movies like Matrix&quot;, &quot;Recommend sci-fi movies from 2020&quot;
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl rounded-lg px-4 py-3 ${
                  message.role === "user" ? "bg-rose-600 text-white" : "border border-zinc-200 bg-white text-zinc-900"
                }`}
              >
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <div key={i} className="whitespace-pre-wrap text-sm">
                        {part.text}
                      </div>
                    );
                  }
                  if (part.type.startsWith("tool-") && "output" in part) {
                    return <ToolResult key={i} part={part as ToolPart} />;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-sm text-zinc-400">Searching...</div>}
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage({ text: input });
            setInput("");
          }}
          className="mx-auto flex max-w-3xl gap-2"
        >
          <input
            className="flex-1 rounded-lg border border-zinc-300 p-3 text-sm focus:border-rose-500 focus:outline-none"
            value={input}
            placeholder="Ask about a movie..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-rose-600 px-5 py-3 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

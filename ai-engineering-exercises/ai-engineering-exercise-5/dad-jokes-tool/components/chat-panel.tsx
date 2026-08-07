"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ToolResult, type ToolPart } from "@/components/tool-result";

export function ChatPanel() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  const rate = (jokeId: string, up: boolean) => {
    sendMessage({ text: `Rate joke ${jokeId} thumbs ${up ? "up" : "down"}.` });
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-50">
      <div className="border-b bg-white py-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">😄 Dad Jokes Tool</h1>
        <p className="text-sm text-zinc-500">Random jokes, keyword search, and ratings</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
              Try: &quot;Tell me a dad joke&quot;, &quot;Give me a programming joke&quot;, &quot;Search jokes about cats&quot;
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl rounded-lg px-4 py-3 ${
                  message.role === "user" ? "bg-amber-500 text-white" : "border border-zinc-200 bg-white text-zinc-900"
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
                    return <ToolResult key={i} part={part as ToolPart} onRate={rate} />;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-sm text-zinc-400">Thinking of one...</div>}
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
            className="flex-1 rounded-lg border border-zinc-300 p-3 text-sm focus:border-amber-500 focus:outline-none"
            value={input}
            placeholder="Ask for a joke..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

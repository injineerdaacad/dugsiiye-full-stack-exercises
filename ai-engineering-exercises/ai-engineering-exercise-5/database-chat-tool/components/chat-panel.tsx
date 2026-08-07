"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ToolResult } from "@/components/tool-result";

export function ChatPanel() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex h-screen flex-col bg-zinc-50">
      <div className="border-b bg-white py-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">🗄️ Database Chat Tool</h1>
        <p className="text-sm text-zinc-500">Ask about movies, users, or reviews in plain English</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
              Try: &quot;Show me all sci-fi movies&quot;, &quot;Find users over 25&quot;, &quot;Movies with rating above 8.5&quot;, &quot;Count movies by genre&quot;
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl rounded-lg px-4 py-3 ${
                  message.role === "user" ? "bg-indigo-600 text-white" : "border border-zinc-200 bg-white text-zinc-900"
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
                  if (part.type.startsWith("tool-") && "output" in part && part.output !== undefined) {
                    return <ToolResult key={i} output={part.output} />;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-sm text-zinc-400">Thinking...</div>}
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
            className="flex-1 rounded-lg border border-zinc-300 p-3 text-sm focus:border-indigo-500 focus:outline-none"
            value={input}
            placeholder="Ask about movies, users, or reviews..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

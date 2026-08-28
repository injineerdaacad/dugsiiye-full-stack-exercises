"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { FileUIPart } from "ai";
import { Streamdown } from "streamdown";
import { ToolResult, type ToolPart } from "@/components/tool-result";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";

  const clearPendingImage = () => {
    setPendingImage(null);
    setPendingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-50">
      <div className="border-b bg-white py-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">🐐 Livestock Doctor</h1>
        <p className="text-sm text-zinc-500">AI livestock health assistant for Somali herders</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
              Describe the animal and its symptoms, e.g. &quot;My goat is coughing and struggling to breathe&quot;,
              or attach a photo of the animal. Ask for the nearest vet by naming your region if it gets serious.
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-2xl rounded-lg px-4 py-3 ${
                  message.role === "user" ? "bg-emerald-600 text-white" : "border border-zinc-200 bg-white text-zinc-900"
                }`}
              >
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return message.role === "assistant" ? (
                      <Streamdown
                        key={i}
                        className="prose prose-sm max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-700 prose-strong:text-zinc-900 prose-li:text-zinc-700"
                        parseIncompleteMarkdown
                      >
                        {part.text}
                      </Streamdown>
                    ) : (
                      <div key={i} className="whitespace-pre-wrap text-sm">
                        {part.text}
                      </div>
                    );
                  }
                  if (part.type === "file" && part.mediaType?.startsWith("image/")) {
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={part.url} alt="Uploaded animal" className="mt-2 max-h-64 rounded-lg" />
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
          {isLoading && <div className="text-sm text-zinc-400">Checking symptoms...</div>}
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!input.trim() && !pendingImage) return;
            let files: FileUIPart[] | undefined;
            if (pendingImage) {
              const url = await fileToDataUrl(pendingImage);
              files = [{ type: "file", mediaType: pendingImage.type, url }];
            }
            sendMessage({ text: input, files });
            setInput("");
            clearPendingImage();
          }}
          className="mx-auto flex max-w-3xl flex-col gap-2"
        >
          {pendingImageUrl && (
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pendingImageUrl} alt="Selected animal" className="h-16 w-16 rounded-lg object-cover" />
              <button
                type="button"
                onClick={clearPendingImage}
                className="text-xs text-zinc-500 underline hover:text-zinc-700"
              >
                Remove photo
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPendingImage(file);
                setPendingImageUrl(URL.createObjectURL(file));
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="rounded-lg border border-zinc-300 px-3 py-3 text-sm hover:bg-zinc-100 disabled:opacity-50"
              title="Attach a photo of the animal"
            >
              📷
            </button>
            <input
              className="flex-1 rounded-lg border border-zinc-300 p-3 text-sm focus:border-emerald-500 focus:outline-none"
              value={input}
              placeholder="Describe the animal and its symptoms..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !pendingImage)}
              className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

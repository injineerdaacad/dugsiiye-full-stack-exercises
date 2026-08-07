import type { UIMessage } from "ai";
import { handleChatRequest } from "@/controllers/chat-controller";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  return handleChatRequest(messages);
}

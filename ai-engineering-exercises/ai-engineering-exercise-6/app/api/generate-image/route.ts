import { auth } from '@/lib/auth';
import { getConversation } from '@/lib/chat-store';
import { generateGeminiImage } from '@/lib/gemini-image';
import { db } from '@/db/drizzle';
import { conversation, message } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createIdGenerator } from 'ai';

const generateMessageId = createIdGenerator({ prefix: 'msg', size: 16 });

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { prompt, conversationId } = await req.json();
    if (!prompt || !conversationId) {
      return new Response('prompt and conversationId are required', { status: 400 });
    }

    const conv = await getConversation(conversationId, session.user.id);
    if (!conv) {
      return new Response('Conversation not found', { status: 404 });
    }

    const userMessageId = createIdGenerator({ prefix: 'msg', size: 16 })();
    const assistantMessageId = generateMessageId();

    try {
      const { mimeType, base64 } = await generateGeminiImage(prompt);
      const imageDataUrl = `data:${mimeType};base64,${base64}`;

      await db.insert(message).values([
        { id: userMessageId, content: prompt, role: 'user', conversationId, userId: session.user.id },
        { id: assistantMessageId, content: '', role: 'assistant', conversationId, userId: session.user.id, imageData: imageDataUrl },
      ]);

      if (conv.title === 'New Conversation') {
        await db.update(conversation).set({ title: prompt.slice(0, 50), updatedAt: new Date() }).where(eq(conversation.id, conversationId));
      } else {
        await db.update(conversation).set({ updatedAt: new Date() }).where(eq(conversation.id, conversationId));
      }

      return Response.json({
        success: true,
        userMessageId,
        assistantMessageId,
        imageDataUrl,
      });
    } catch (err) {
      const errorText = err instanceof Error ? err.message : String(err);
      await db.insert(message).values([
        { id: userMessageId, content: prompt, role: 'user', conversationId, userId: session.user.id },
        { id: assistantMessageId, content: `Sorry, I couldn't generate that image: ${errorText}`, role: 'assistant', conversationId, userId: session.user.id },
      ]);
      return Response.json({ success: false, userMessageId, assistantMessageId, error: errorText }, { status: 502 });
    }
  } catch (error) {
    console.error('Generate image API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

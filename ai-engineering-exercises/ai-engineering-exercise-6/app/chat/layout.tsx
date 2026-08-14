import { auth } from '@/lib/auth';
import { getUserConversations } from '@/lib/chat-store';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import ConversationSidebar from '@/components/conversation-sidebar';

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  const conversations = await getUserConversations(session.user.id);

  return (
    <div className="flex h-screen overflow-hidden">
      <ConversationSidebar
        conversations={conversations.map((c) => ({ id: c.id, title: c.title, updatedAt: c.updatedAt }))}
      />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

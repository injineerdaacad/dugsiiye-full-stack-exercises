'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, MessageSquare } from 'lucide-react';

interface ConversationSidebarProps {
  conversations: { id: string; title: string; updatedAt: Date }[];
}

export default function ConversationSidebar({ conversations }: ConversationSidebarProps) {
  const pathname = usePathname();
  const activeId = pathname?.startsWith('/chat/') ? pathname.split('/chat/')[1] : null;

  return (
    <aside className="w-64 flex-shrink-0 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-3">
        <Link
          href="/chat"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-1">
        {conversations.length === 0 && (
          <p className="text-xs text-gray-400 px-3 py-2">No conversations yet</p>
        )}
        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/chat/${c.id}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm truncate transition-colors ${
              activeId === c.id
                ? 'bg-rose-100 text-rose-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{c.title}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

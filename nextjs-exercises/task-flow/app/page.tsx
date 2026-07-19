import Link from "next/link";
import { ListChecks, Sparkles, Zap } from "lucide-react";

import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ListChecks,
    title: "Stay organized",
    description: "Track tasks by status: to do, in progress, and done.",
  },
  {
    icon: Sparkles,
    title: "AI suggestions",
    description: "Get task ideas generated for you when you're stuck.",
  },
  {
    icon: Zap,
    title: "Fast by default",
    description: "Instant updates powered by TanStack Query caching.",
  },
];

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-accent/40 to-transparent px-4 py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <ListChecks className="size-7" />
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          TaskFlow
        </h1>
        <p className="max-w-md text-balance text-muted-foreground">
          A simple task manager. Sign up, keep track of your tasks, and let AI
          suggest what to do next.
        </p>
        <div className="flex gap-3">
          {session ? (
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/dashboard" />}
            >
              Go to dashboard
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/register" />}
              >
                Get started
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                Sign in
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-px border-t bg-border sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="space-y-2 bg-background p-8">
            <Icon className="size-5 text-primary" />
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary opacity-1" />
      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">We&apos;re glad to see you again</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

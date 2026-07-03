import type { Metadata } from "next";
import "@/app/globals.css";
import { config } from "@/config";

export const metadata: Metadata = {
  title: config.app.name,
  description: config.app.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full bg-slate-100">{children}</body>
    </html>
  );
}

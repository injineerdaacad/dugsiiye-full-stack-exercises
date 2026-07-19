# TaskFlow

A simple task manager built with Next.js, Better Auth, Prisma, and TanStack Query, with AI-generated task suggestions.

## Stack

- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- Better Auth (email/password) with the Prisma adapter
- Prisma + PostgreSQL (Neon), using the Neon driver adapter
- Server Actions for task CRUD, TanStack Query on the client for caching/mutations
- Zod + React Hook Form for validation
- Google Gemini API (free tier) for AI task suggestions

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env file and fill in the values:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URL`: a Neon Postgres connection string
   - `BETTER_AUTH_SECRET`: any random string, e.g. `openssl rand -base64 32`
   - `BETTER_AUTH_URL`: `http://localhost:3000` in development
   - `GEMINI_API_KEY`: a free key from https://aistudio.google.com/apikey

3. Push the schema to your database:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add the same environment variables from `.env` in the Vercel project settings (set `BETTER_AUTH_URL` to your production URL).
3. Deploy. Run `npx prisma migrate deploy` against the production database before the first deploy (or add it as a build step).

# Personal Finance Tracker Web

React frontend for the Personal Finance Tracker API. The app provides authentication, transaction management, finance summaries, profile image upload, and admin user management.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- shadcn-style UI components
- TanStack React Query
- Axios
- Zod
- Zustand
- React Router

## Requirements

- Node.js 20 or later recommended
- npm
- Running Personal Finance Tracker API

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env` from the example file:

```bash
cp .env.example .env
```

Set the API URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Default local URLs:

- Web: `http://localhost:5173`
- API: `http://localhost:5000`

If Vite starts on another port, add that frontend origin to the backend API `ALLOWED_ORIGINS`.

## Environment Variables

| Variable | Required | Example | Description |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | Yes | `http://localhost:5000` | Base URL for the backend API. |

Production example:

```env
VITE_API_BASE_URL=https://dugsiiye-full-stack-exercises.onrender.com
```

## Available Scripts

```bash
npm run dev
```

Runs the app locally with Vite.

```bash
npm run build
```

Creates the production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Project Structure

```txt
src/
  components/
    admin/        Admin overview and user management UI
    auth/         Login and register forms
    dashboard/    Dashboard layout, sidebar, and views
    data/         Shared data table controls
    finance/      Transactions, stats, and finance summaries
    ui/           shadcn-style reusable primitives
  hooks/          React Query hooks and app data hooks
  lib/            Utility helpers
  pages/          Route-level pages
  schemas/        Zod validation schemas
  services/       Axios API clients and service methods
  store/          Zustand auth store
```

## Features

- Login and registration
- Protected dashboard routes
- Transaction list, create, edit, delete
- Search, filters, sorting, pagination, and serial numbers in data tables
- Finance summary by period
- Profile image upload
- Admin overview
- Admin user list, create, edit, delete
- Role and account status management

## Backend Connection

The frontend sends API requests to `VITE_API_BASE_URL`.

The backend must allow the frontend URL in `ALLOWED_ORIGINS`.

Local backend example:

```env
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:3000,http://localhost:19000
```

Production backend example:

```env
ALLOWED_ORIGINS=https://personal-finance-tracker-0spb.onrender.com
```

## Deploy to Render Static Site

Create a new **Static Site** on Render.

Use these settings:

```txt
Root Directory:
personal-finance-tracker

Build Command:
npm install && npm run build

Publish Directory:
dist
```

Add this environment variable in Render:

```env
VITE_API_BASE_URL=https://dugsiiye-full-stack-exercises.onrender.com
```

After deployment, copy the frontend Render URL and add it to the backend API `ALLOWED_ORIGINS`.

Example:

```env
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:3000,http://localhost:19000,https://personal-finance-tracker-0spb.onrender.com
```

Then redeploy or restart the backend API.

## Deploy Checklist

- Backend API is deployed and reachable.
- `VITE_API_BASE_URL` points to the deployed backend API.
- Backend `ALLOWED_ORIGINS` includes the deployed frontend URL.
- Render Static Site root directory is correct.
- Build command is `npm install && npm run build`.
- Publish directory is `dist`.

## Authentication Notes

Auth tokens are stored in browser local storage using Zustand persistence.

If a developer changes `JWT_SECRET` or switches backend environments, old browser tokens may become invalid. Clear local storage if needed:

```js
localStorage.removeItem("finance-auth")
```

## Generated Files

These folders are generated and should not be committed:

- `node_modules/`
- `dist/`
- `.vite/`

## Related Services

- Backend API: `../node-js-exercises/node-js-exercise-4`
- Deployed API example: `https://dugsiiye-full-stack-exercises.onrender.com`

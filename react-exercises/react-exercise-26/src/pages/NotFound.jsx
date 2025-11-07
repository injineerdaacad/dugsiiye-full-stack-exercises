import React from "react";
import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const routeError = typeof useRouteError === "function" ? useRouteError() : null;
  const message = routeError?.statusText || routeError?.message;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg rounded-3xl border border-slate-200/70 bg-white p-10 text-center shadow-[0_25px_45px_-35px_rgba(15,23,42,0.4)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500/70">404</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Page Not Found</h2>
        {message && <p className="mt-2 text-sm text-slate-500">{message}</p>}
        <p className="mt-4 text-sm text-slate-500">Sorry, this page does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-16">
        <Header />
        <main className="flex-1 space-y-8">
          <Outlet />
        </main>
        <footer className="pt-10 text-center text-xs font-medium text-slate-500">
          Blog Post App • React Router • Protected Routes
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
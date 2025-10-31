import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
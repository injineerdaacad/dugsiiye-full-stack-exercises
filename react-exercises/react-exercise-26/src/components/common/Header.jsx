import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

const linkClasses = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
  }`;

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Blog</h1>
        </div>
      </div>
      
      <nav className="flex flex-wrap items-center gap-3">
        <NavLink to="/" className={linkClasses} end>
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/create" className={linkClasses}>
            Create Post
          </NavLink>
        )}
        {isAuthenticated ? (
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-900 hover:text-white"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-900 hover:text-white"
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
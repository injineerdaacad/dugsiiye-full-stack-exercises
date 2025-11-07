import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const onLogin = React.useCallback(() => {
    login();
    navigate(redirectPath, { replace: true });
  }, [login, navigate, redirectPath]);

  return (
    <div className="max-w-md rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_25px_45px_-35px_rgba(15,23,42,0.4)]">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Login</h2>
      <p className="mt-2 text-sm text-slate-500">To access the Create Post page, please log in.</p>
      <button
        className="mt-6 inline-flex w-full justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        onClick={onLogin}
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
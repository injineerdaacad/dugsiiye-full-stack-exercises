import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError?.();
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-3">Oops!</h2>
      
      <p className="text-slate-500 mb-4">
        {error?.statusText || error?.message || "Page not found."}
      </p>

      <Link
        to="/"
        className="inline-block px-5 py-2 bg-red-600 text-white rounded-md"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
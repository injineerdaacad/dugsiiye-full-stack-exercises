import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function useQueryParam(key, defaultValue = "") {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const value = params.get(key) ?? defaultValue;

  const setValue = (next) => {
    const nextParams = new URLSearchParams(location.search);
    if (next && String(next).length) nextParams.set(key, next);
    else nextParams.delete(key);
    const search = nextParams.toString();
    navigate({ pathname: location.pathname, search: search ? `?${search}` : "" }, { replace: true });
  };

  return [value, setValue];
}
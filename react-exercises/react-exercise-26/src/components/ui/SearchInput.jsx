import React from "react";

const SearchInput = ({
  id = "search",
  label,
  value,
  onChange,
  placeholder = "Search…",
  autoFocus = false,
  resultsLabel,
}) => {
  const inputId = id;
  const handleChange = React.useCallback(
    (event) => {
      onChange?.(event.target.value);
    },
    [onChange]
  );

  const handleClear = React.useCallback(() => {
    onChange?.("");
  }, [onChange]);

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </label>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <input
            id={inputId}
            className="w-full rounded-full border border-slate-800/60 bg-slate-900/95 px-5 py-3 text-base text-slate-100 shadow-inner transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            aria-label={label || placeholder}
            autoFocus={autoFocus}
          />
          {value && value.length > 0 && (
            <button
              type="button"
              className="absolute inset-y-1 right-1 rounded-full bg-slate-800/70 px-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              onClick={handleClear}
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>
        {resultsLabel && (
          <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
            {resultsLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
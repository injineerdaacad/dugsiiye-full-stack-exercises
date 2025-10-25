import React from "react";

const FormSelect = ({ label, name, value, onChange, onBlur, options, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-1 block w-full rounded-lg border ${
          error
            ? "border-red-300 ring-red-500"
            : "border-zinc-300 ring-blue-500"
        } px-3 py-2 text-sm focus:outline-none focus:ring-2`}
      >
        <option value="">Select a role</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;
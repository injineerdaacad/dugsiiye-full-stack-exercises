import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  min,
  max,
  error,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`mt-1 block w-full rounded-lg border ${
          error
            ? "border-red-300 ring-red-500"
            : "border-zinc-300 ring-blue-500"
        } px-3 py-2 text-sm focus:outline-none focus:ring-2`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
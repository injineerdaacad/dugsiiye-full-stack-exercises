import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
  validation = {},
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
            : "border-zinc-300 focus:ring-blue-500 focus:border-blue-500"
        } transition-all`}
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-pulse">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;
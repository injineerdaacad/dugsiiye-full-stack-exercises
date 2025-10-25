import React from "react";

const FormCheckbox = ({ label, name, checked, onChange, onBlur, error }) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="text-sm text-zinc-700">
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormCheckbox;
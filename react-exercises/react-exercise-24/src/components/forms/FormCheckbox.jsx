import React from "react";

const FormCheckbox = ({ label, name, register, validation = {}, error }) => {
  return (
    <div>
      <label className="flex items-center space-x-2 cursor-pointer group">
        <input
          type="checkbox"
          {...register(name, validation)}
          className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 transition-all group-hover:scale-110"
        />
        <span className="text-sm text-zinc-700">{label}</span>
      </label>
      
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-pulse">{error.message}</p>
      )}
    </div>
  );
};

export default FormCheckbox;
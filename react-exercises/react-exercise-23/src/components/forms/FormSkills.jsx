import React from "react";

const FormSkills = ({ label, skills, checkedSkills, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <label key={skill} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checkedSkills.includes(skill)}
              onChange={() => onChange(skill)}
              className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-zinc-600">{skill}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormSkills;
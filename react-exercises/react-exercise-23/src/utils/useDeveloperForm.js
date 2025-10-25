import { useState } from "react";
import validateDeveloperField from "./validateDeveloperField";
import initialDeveloperForm from "./initialDeveloperForm";

const useDeveloperForm = () => {
  const [formData, setFormData] = useState(initialDeveloperForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const error = validateDeveloperField(name, name === "skills" ? formData.skills : newValue);
    if (!error) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const error = validateDeveloperField(name, fieldValue);
    
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSkillChange = (skill) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];

    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));

    const error = validateDeveloperField("skills", newSkills);
    setErrors((prev) => ({
      ...prev,
      skills: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateDeveloperField(key, formData[key]);
      if (error) formErrors[key] = error;
    });
    if (Object.keys(formErrors).length === 0) {
      console.log("Form submitted:", formData);
      setFormData(initialDeveloperForm);
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSkillChange,
    handleSubmit,
    setFormData,
    setErrors,
  };
};

export default useDeveloperForm;
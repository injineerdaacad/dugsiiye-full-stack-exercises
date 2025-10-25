import React, { useState } from "react";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import FormSelect from "./FormSelect";
import Button from "../ui/Button";
import { initialFormData } from "../../utils/formUtils";
import useFormValidation from "../../utils/useFormValidation";


const FormContainer = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { errors, validateField, validateForm, setErrors, clearFieldError } = useFormValidation();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
    if (!validateField(name, fieldValue)) clearFieldError(name);
  };

  const handleBlur = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const msg = validateField(name, fieldValue);
    if (msg) setErrors((prev) => ({ ...prev, [name]: msg }));
    else clearFieldError(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted:", formData);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100"
      >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Form Validation Exercise
        </h2>
        <h3 className="text-lg font-medium text-blue-600">
          Registration
        </h3>
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-3 rounded-full"></div>
      </div>

      <FormInput
        label="Username *"
        name="username"
        value={formData.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your username"
      />
      {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}

      <FormInput
        label="Email *"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your email"
      />
      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}

      <FormInput
        label="Password *"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your password"
        />
      {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
        <p className="text-sm text-blue-700">
          <span className="font-medium">Password Requirements:</span> Must be more than 8 characters, uppercase, lowercase, and number
        </p>
      </div>

      <FormSelect
        label="Country *"
        name="country"
        value={formData.country}
        onChange={handleChange}
        onBlur={handleBlur}
        options={[
          { label: "Somalia", value: "som" },
          { label: "Saudi Arabia", value: "sa" },
        ]}
      />
      {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}

      <FormCheckbox
        label="I agree to the terms and conditions *"
        name="terms"
        checked={formData.terms}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.terms && <p className="text-red-600 text-sm mt-1">{errors.terms}</p>}

      <Button type="submit">Submit Form</Button>
      </form>
    </div>
  );
};

export default FormContainer;
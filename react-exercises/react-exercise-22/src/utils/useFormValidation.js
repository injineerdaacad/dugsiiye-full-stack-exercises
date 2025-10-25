import { useState } from "react";

const validateField = (name, value) => {
  switch (name) {
    case "username":
      if (!value || !value.trim()) return "Username is required";
          return "";
      
    case "email": {
      if (!value || !value.trim()) return "Email is required";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) return "Enter a valid email";
      return "";
      }
          
    case "password": {
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(value)) return "Password must include an uppercase letter";
      if (!/[a-z]/.test(value)) return "Password must include a lowercase letter";
      if (!/[0-9]/.test(value)) return "Password must include a number";
      return "";
      }
          
    case "country":
      if (!value) return "Country is required";
          return "";
      
    case "terms":
      if (!value) return "You must agree to the terms";
          return "";
      
    default:
      return "";
  }
};

const validateForm = (data) => {
  const newErrors = {};
  Object.keys(data).forEach((key) => {
    const msg = validateField(key, data[key]);
    if (msg) newErrors[key] = msg;
  });
  return newErrors;
};

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const clearFieldError = (name) => {
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  return {
    errors,
    setErrors,
    validateField,
    validateForm,
    clearFieldError,
  };
};

export default useFormValidation;
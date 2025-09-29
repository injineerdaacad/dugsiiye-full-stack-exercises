import { useState, useEffect } from "react";

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const reset = () => setValues(initialValues);

  return {
    values,
    handleChange,
    handleSubmit,
    reset,
    setValues,
  };
};

export default useForm;
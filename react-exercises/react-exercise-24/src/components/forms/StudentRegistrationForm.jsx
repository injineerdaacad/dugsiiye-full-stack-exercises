import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import Button from "../ui/Button";
import { SUBJECT_OPTIONS, GRADE_OPTIONS } from "../../utils/studentFormData";

const StudentRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: { studentName: "", email: "", gradeLevel: "", subjects: [], terms: false }, mode: "onChange"});

  useEffect(() => {
    const savedData = localStorage.getItem("studentRegistration");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        Object.keys(parsed).forEach((key) => {
          if (parsed[key] !== undefined) {
            reset({ [key]: parsed[key] });
          }
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, [reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setShowSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    
    localStorage.setItem("studentRegistration", JSON.stringify(data));
    
    alert("Registration successful!\n" + JSON.stringify(data, null, 2));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem("studentRegistration");
    setShowSuccess(false);
    reset(
      { studentName: "", email: "", gradeLevel: "", subjects: [], terms: false },
      { keepErrors: false, keepDirty: false, keepIsSubmitted: false, keepTouched: false, keepIsValid: false, keepSubmitCount: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <p className="text-green-800 font-medium">Registration successful!</p>
        </div>
      )}

      <FormInput
        label="Student Name"
        name="studentName"
        placeholder="Enter your full name"
        register={register}
        error={errors.studentName}
        validation={{
          required: "Name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Name must contain only letters and spaces",
          },
        }}
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="example@domain.com"
        register={register}
        error={errors.email}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
      />

      <FormSelect
        label="Grade Level"
        name="gradeLevel"
        options={GRADE_OPTIONS}
        register={register}
        error={errors.gradeLevel}
        validation={{
          required: "Please select a grade",
        }}
      />

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Subject Interests
        </label>

        <div className="space-y-2">
          {SUBJECT_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                {...register("subjects", {
                  required: "Select at least one subject",
                  validate: (value) => {
                    if (!Array.isArray(value) || value.length === 0) {
                      return "Select at least one subject";
                    }
                    return true;
                  },
                })}
                value={option.value}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 transition-all group-hover:scale-110"
              />
              <span className="text-sm text-zinc-600">{option.label}</span>
            </label>
          ))}
        </div>

        {errors.subjects && (
          <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.subjects.message}</p>
        )}
      </div>

      <FormCheckbox
        label="I accept the terms and conditions"
        name="terms"
        register={register}
        error={errors.terms}
        validation={{
          required: "You must accept the terms",
        }}
      />

      <Button type="submit" isLoading={isLoading}>
        Register
      </Button>

      <Button type="button" variant="secondary" onClick={handleReset}>
        Reset Form
      </Button>
    </form>
  );
};

export default StudentRegistrationForm;
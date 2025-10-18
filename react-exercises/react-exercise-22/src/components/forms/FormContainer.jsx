import React, { useState } from "react";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import FormSelect from "./FormSelect";
import Button from "../ui/Button";
import { initialFormData } from "../../utils/formUtils";


const FormContainer = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData(initialFormData);
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
        placeholder="Enter your username"
      />

      <FormInput
        label="Email *"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      <FormInput
        label="Password *"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        />
              
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
        options={[
          { label: "Somalia", value: "som" },
          { label: "Saudi Arabia", value: "sa" },
        ]}
      />

      <FormCheckbox
        label="I agree to the terms and conditions *"
        name="terms"
        checked={formData.terms}
        onChange={handleChange}
      />

      <Button type="submit">Submit Form</Button>
      </form>

      {submittedData && (
              <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 shadow-xl rounded-2xl p-6 border border-green-200">
                  
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Submitted Data</h3>        
            <div className="w-12 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
                  
          <div className="space-y-3 text-sm bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Username:</span>
              <span className="text-gray-900 font-medium">{submittedData.username}</span>
            </div>
                      
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-900 font-medium">{submittedData.email}</span>
            </div>
                      
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Password:</span>
              <span className="text-gray-900 font-mono">{'•'.repeat(submittedData.password.length)}</span>
            </div>
                      
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Country:</span>
              <span className="text-gray-900 font-medium">{submittedData.country}</span>
            </div>
                      
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-700">Terms:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${submittedData.terms ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submittedData.terms ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <Button
            onClick={() => setSubmittedData(null)}
            variant="secondary"
          >
            New Form
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormContainer;
import React from "react";
import useDeveloperForm from "../../utils/useDeveloperForm";
import roles from "../../utils/roles";
import skillOptions from "../../utils/skillOptions";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import FormSkills from "./FormSkills";
import Button from "../ui/Button";

const DeveloperApplicationForm = () => {
  const { formData, errors, handleChange, handleBlur, handleSkillChange, handleSubmit } = useDeveloperForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fullName}
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />

      <FormSelect
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        onBlur={handleBlur}
        options={roles}
        error={errors.role}
      />

      <FormInput
        label="Years of Experience"
        name="experience"
        type="number"
        value={formData.experience}
        onChange={handleChange}
        onBlur={handleBlur}
        min="0"
        max="50"
        error={errors.experience}
      />

      <FormSkills
        label="Skills"
        skills={skillOptions}
        checkedSkills={formData.skills}
        onChange={handleSkillChange}
        error={errors.skills}
      />

      <FormCheckbox
        label="I agree to the terms and conditions"
        name="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.agreeToTerms}
      />

      <FormCheckbox
        label="Receive notifications about new opportunities"
        name="notifications"
        checked={formData.notifications}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Button type="submit">Submit Application</Button>
    </form>
  );
};

export default DeveloperApplicationForm;
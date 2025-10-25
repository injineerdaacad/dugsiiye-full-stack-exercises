const validateDeveloperField = (name, value) => {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Full name is required";
      if (!/^[a-zA-Z\s]{2,30}$/.test(value)) return "Please enter a valid name (2-30 characters, letters only)";
      return "";
    
    case "email":
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
      return "";
    
    case "role":
      if (!value) return "Please select a role";
      return "";
    
    case "experience":
      if (value === "" || value === undefined) return "Experience is required";
      if (isNaN(value) || value < 0 || value > 50) return "Please enter valid years of experience (0-50)";
      return "";
    
    case "skills":
      if (!value || value.length === 0) return "Please select at least one skill";
      return "";
    
    case "agreeToTerms":
      if (!value) return "You must agree to the terms";
      return "";
    
    default:
      return "";
  }
};

export default validateDeveloperField;
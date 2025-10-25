import React from "react";

const Button = ({ type = "button", children, onClick, variant = "primary", isLoading = false, disabled = false }) => {
  const baseClasses = "w-full font-semibold rounded-lg py-2 px-4 text-sm transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-rose-500 hover:bg-rose-600 text-white shadow-sm focus:ring-rose-500 hover:scale-105 active:scale-95",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 hover:scale-105 active:scale-95",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 hover:scale-105 active:scale-95"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
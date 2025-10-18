import React from "react";

const Button = ({ type = "button", children, onClick, variant = "primary" }) => {
  const baseClasses = "w-full font-semibold rounded-xl py-3 px-4 transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 hover:scale-105 active:scale-95",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 hover:scale-105 active:scale-95",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 hover:scale-105 active:scale-95"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
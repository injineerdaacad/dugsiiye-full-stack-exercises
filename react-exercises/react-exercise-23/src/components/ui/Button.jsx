import React from "react";

const Button = ({ type = "button", children, onClick, variant = "primary" }) => {
  const baseClasses = "w-full font-semibold rounded-lg py-2 px-4 text-sm transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-rose-600 hover:bg-rose-500 text-white shadow-sm focus:ring-rose-500 hover:scale-105 active:scale-95",
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
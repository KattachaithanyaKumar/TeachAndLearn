import PropTypes from "prop-types";
import React from "react";

const Button = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center px-6 py-3 font-semibold rounded-full transition-all duration-200 cursor-pointer";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transform hover:scale-105",
    secondary:
      "bg-white text-gray-800 border-2 border-gray-300 hover:border-red-500 hover:text-red-600",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;

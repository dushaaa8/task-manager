import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "lg" | "xl";
}

export default function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center rounded-xl font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2";

  const sizeStyles = {
    sm: "h-10 px-18 text-xs",
    lg: "h-14 px-18",
    xl: "h-16 px-18",
  };

  const variantStyles = {
    primary:
      "bg-primary-blue text-white hover:scale-101 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed border border-transparent",
    secondary:
      "bg-transparent border-2 border-primary-blue text-primary-blue hover:bg-blue-50 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed",
    tertiary:
      "bg-transparent text-primary-blue hover:bg-blue-50 disabled:text-gray-400 disabled:cursor-not-allowed border border-transparent",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}

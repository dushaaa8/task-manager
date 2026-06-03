import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "lg" | "xl";
}

export default function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...props
}: Props) {
  const baseStyles =
    "flex items-center justify-center rounded-xl hover:scale-105 font-medium transition-all outline-none";

  const sizeStyles = {
    sm: "h-10 px-18 text-xs",
    lg: "h-14 px-8",
    xl: "h-16 px-18",
  };

  const variantStyles = {
    primary:
      "bg-primary-blue text-white  disabled:opacity-20 disabled:cursor-not-allowed border border-transparent",
    secondary:
      "bg-white border-2 border-primary-blue text-primary-blue hover:bg-blue-50 disabled:opacity-20 disabled:cursor-not-allowed",
    tertiary: "bg-white text-primary-blue hover:bg-blue-50",
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

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  iconRight?: React.ReactNode;
  iconRightFunc?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      iconRight,
      iconRightFunc,
      className = "",
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || Math.random().toString(36).substring(7);

    let inputStyles =
      "w-full h-12 px-4 rounded-xl border outline-none transition-colors duration-200 text-base ";

    if (disabled) {
      inputStyles +=
        "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed ";
    } else if (error) {
      inputStyles +=
        "border-red-500 text-red-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 ";
    } else {
      inputStyles +=
        "bg-white border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ";
    }

    if (iconRight) {
      inputStyles += "pr-10 ";
    }

    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-primary-dark-gray pb-3.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputStyles}
            {...props}
          />
          {iconRight && iconRightFunc && (
            <button
              type="button"
              onClick={iconRightFunc}
              className="absolute right-3 text-primary-light-gray flex items-center justify-center cursor-pointer"
            >
              {iconRight}
            </button>
          )}
        </div>
        {error ? (
          <span className="text-xs text-semantic-error-red pt-2">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-primary-light-gray pt-2">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

import { useEffect, useRef, useState } from "react";

export interface ISelectOption<T> {
  value: T;
  label: string;
}

interface Props<T> {
  label?: string;
  options: ISelectOption<T>[];
  value: string;
  onChange: (value: T) => void;
  placeholder?: string;
}

export default function Selector<T extends string = string>({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative`} ref={dropdownRef}>
      {label && (
        <label className="mb-2 block text-sm text-primary-dark-blue">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all cursor-pointer ${
          isOpen
            ? "border-primary-blue bg-main-background-gray! text-secondary-gray font-semibold ring-2 ring-primary-blue/10"
            : "border-primary-light-gray/50 text-primary-light-gray hover:border-primary-light-gray"
        }`}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <svg
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary-dark-blue" : "text-primary-light-gray"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
          <ul className="max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer rounded-xl px-4 py-3 text-sm transition-colors ${
                    isSelected
                      ? "bg-main-background-gray font-medium text-primary-dark-blue"
                      : "text-secondary-gray hover:bg-main-background-gray hover:text-primary-dark-blue"
                  }`}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

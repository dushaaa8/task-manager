import { formatDate } from "../../utils/formatDate";

interface Props {
  label: string;
  value: string | null | undefined;
  highlighted?: boolean;
}

export default function TaskDateField({ label, value, highlighted }: Props) {
  return (
    <div className="relative z-10 flex items-start justify-end gap-4 text-right">
      <div>
        <span className="mb-1 block text-left text-xs font-medium text-secondary-gray">
          {label}
        </span>
        <span
          className={`block text-sm font-bold ${
            highlighted ? "text-primary-dark-blue" : ""
          }`}
        >
          {formatDate(value)}
        </span>
      </div>
      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-blue bg-white">
        {highlighted && (
          <div className="h-3 w-3 rounded-full bg-primary-blue" />
        )}
      </div>
    </div>
  );
}

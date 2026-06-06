import { STATUS_BADGE_CONFIG } from "../../constants/statusConfig";
import type { TaskStatus } from "../../types";

interface Props {
  status: TaskStatus;
  size?: "sm" | "md";
}

export default function TaskStatusBadge({ status, size = "sm" }: Props) {
  const config = STATUS_BADGE_CONFIG[status];
  const sizeClasses =
    size === "md" ? "px-4 py-1.5 text-xs font-semibold" : "px-3 py-1 h-6 text-xs";

  return (
    <span className={`rounded-xl ${config.classes} ${sizeClasses}`}>
      {config.label}
    </span>
  );
}

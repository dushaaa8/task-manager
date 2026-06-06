import type { TaskStatus } from "../types";

interface StatusBadgeConfig {
  label: string;
  classes: string;
}

interface StatusDetailConfig extends StatusBadgeConfig {
  btnText: string;
  btnDisabled: boolean;
}

export const STATUS_BADGE_CONFIG: Record<TaskStatus, StatusBadgeConfig> = {
  todo: {
    label: "Pending",
    classes: "text-semantic-warning-yellow bg-amber-50",
  },
  in_progress: {
    label: "In Progress",
    classes: "text-primary-blue bg-blue-50",
  },
  done: {
    label: "Completed",
    classes: "text-semantic-success-green bg-green-50",
  },
};

export const STATUS_DETAIL_CONFIG: Record<TaskStatus, StatusDetailConfig> = {
  todo: {
    ...STATUS_BADGE_CONFIG.todo,
    btnText: "Work on it Now",
    btnDisabled: false,
  },
  in_progress: {
    ...STATUS_BADGE_CONFIG.in_progress,
    btnText: "Complete Task",
    btnDisabled: false,
  },
  done: {
    ...STATUS_BADGE_CONFIG.done,
    btnText: "Task Completed",
    btnDisabled: true,
  },
};

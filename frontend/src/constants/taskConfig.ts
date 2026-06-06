import type { ISelectOption } from "../components/ui/Selector";
import type { TaskPriority, TaskStatus } from "../types";

export const TASK_SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
  { value: "dueDate-asc", label: "Soonest First" },
  { value: "dueDate-desc", label: "Latest First" },
  { value: "priority-desc", label: "Highest Priority" },
  { value: "priority-asc", label: "Lowest Priority" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "updatedAt-desc", label: "Recently Updated" },
] as const;

export const TASK_PRIORITY_FILTER_OPTIONS: ISelectOption<string>[] = [
  { value: "", label: "All Priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const TASK_FORM_PRIORITY_OPTIONS: ISelectOption<TaskPriority>[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export type TaskTabId = TaskStatus | "all";

export interface TaskTab {
  id: TaskTabId;
  label: string;
  countKey: keyof TaskTabCounts;
}

export interface TaskTabCounts {
  all: number;
  todo: number;
  inProgress: number;
  done: number;
}

export const TASK_TABS: Omit<TaskTab, "countKey">[] = [
  { id: "all", label: "All Tasks" },
  { id: "todo", label: "Pending" },
  { id: "in_progress", label: "In Progress" },
  { id: "done", label: "Completed" },
];

export const TASK_TAB_COUNT_KEYS: Record<TaskTabId, keyof TaskTabCounts> = {
  all: "all",
  todo: "todo",
  in_progress: "inProgress",
  done: "done",
};

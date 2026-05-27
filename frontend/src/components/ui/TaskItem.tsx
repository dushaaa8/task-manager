import { Link } from "react-router-dom";
import TaskViewBtnIcon from "./icons/TaskViewBtnIcon";

export type TaskStatus = "todo" | "in_progress" | "done";

interface ITaskCardProps {
  index: number;
  title: string;
  status: TaskStatus;
  id: string;
}

const statusConfig = {
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

export default function TaskItem({ id, index, title, status }: ITaskCardProps) {
  const currentConfig = statusConfig[status];
  return (
    <div className="p-5 h-43 bg-white rounded-xl flex flex-col gap-5 max-w-60">
      <div className="flex justify-between">
        <span className="font-semibold text-sm text-gray-400">T-0{index}</span>
        <span
          className={`${currentConfig.classes} px-3 py-1 h-6 rounded-xl text-xs`}
        >
          {currentConfig.label}
        </span>
      </div>
      <p className="font-medium line-clamp-2 h-12">{title}</p>
      <Link
        to={`/tasks/${id}`}
        className="w-24 text-primary-blue font-semibold text-sm cursor-pointer flex gap-3 border-b border-transparent hover:border-b hover:border-primary-blue"
      >
        View Task <TaskViewBtnIcon />
      </Link>
    </div>
  );
}

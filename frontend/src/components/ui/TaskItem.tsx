import { Link } from "react-router-dom";
import TaskStatusBadge from "../tasks/TaskStatusBadge";
import type { TaskStatus } from "../../types";
import TaskViewBtnIcon from "./icons/TaskViewBtnIcon";

interface ITaskCardProps {
  index: number;
  title: string;
  status: TaskStatus;
  id: string;
}

export default function TaskItem({ id, index, title, status }: ITaskCardProps) {
  return (
    <div className="flex h-43 max-w-60 flex-col gap-5 rounded-xl bg-white p-5">
      <div className="flex justify-between">
        <span className="text-sm font-semibold text-gray-400">T-0{index}</span>
        <TaskStatusBadge status={status} />
      </div>
      <p className="line-clamp-2 h-12 font-medium">{title}</p>
      <Link
        to={`/tasks/${id}`}
        className="flex w-24 cursor-pointer gap-3 border-b border-transparent text-sm font-semibold text-primary-blue hover:border-primary-blue"
      >
        View Task <TaskViewBtnIcon />
      </Link>
    </div>
  );
}

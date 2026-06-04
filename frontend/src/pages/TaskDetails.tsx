import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import BackArrowIcon from "../components/ui/icons/BackArrowIcon";
import BreadcrumbsIcon from "../components/ui/icons/BreadcrumbsIcon";
import DeleteTaskIcon from "../components/ui/icons/DeleteTaskIcon";
import EditTaskIcon from "../components/ui/icons/EditTaskIcon";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { TaskFormModal } from "../components/ui/TaskFormModal";
import type { TaskStatus } from "../components/ui/TaskItem";
import { useDeleteTask, useUpdateTask } from "../hooks/useTaskMutation";
import { useSingleTask } from "../hooks/useTasks";

export const TaskDetails = () => {
  const { id } = useParams();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: task, isLoading, isError } = useSingleTask(id);
  const updateMutation = useUpdateTask(id);
  const deleteMutation = useDeleteTask(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !task) {
    return <div>Task not found or Access Denied</div>;
  }

  const handleStatusTransition = () => {
    if (task.status === "todo") {
      updateMutation.mutate({ status: "in_progress" });
    } else if (task.status === "in_progress") {
      updateMutation.mutate({ status: "done" });
    }
  };

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case "todo":
        return {
          btnText: "Work on it Now",
          badgeText: "Pending",
          badgeClass: "text-semantic-warning-yellow bg-amber-50",
          btnDisabled: false,
        };
      case "in_progress":
        return {
          btnText: "Complete Task",
          badgeText: "In Progress",
          badgeClass: "bg-blue-50 text-primary-blue",
          btnDisabled: false,
        };
      case "done":
        return {
          btnText: "Task Completed",
          badgeText: "Completed",
          badgeClass: "text-semantic-success-green bg-green-50",
          btnDisabled: true,
        };
    }
  };

  const statusConfig = getStatusConfig(task.status);

  return (
    <div className="p-12 w-full">
      <div className="flex items-center gap-2 mb-4">
        <Link
          to="/tasks"
          className="text-primary-dark-blue font-semibold text-3xl hover:underline"
        >
          Tasks
        </Link>
        <BreadcrumbsIcon />
        <span className="text-primary-dark-blue font-medium">{task.title}</span>
      </div>

      <Link
        to="/tasks"
        className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 transition-transform hover:scale-105"
      >
        <BackArrowIcon />
      </Link>

      <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex justify-between gap-12 relative">
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-medium mb-4 ">{task.title}</h1>

          <div className="mb-6">
            <span
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold ${statusConfig.badgeClass}`}
            >
              {statusConfig.badgeText}
            </span>
          </div>

          <p className="text-secondary-gray mb-12">{task.description}</p>

          <div className="flex items-center gap-3 mt-auto">
            <Button
              size="lg"
              className="px-8 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleStatusTransition}
              disabled={statusConfig.btnDisabled || updateMutation.isPending}
            >
              {statusConfig.btnText}
            </Button>

            <Button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 transition-colors hover:bg-red-100"
            >
              <div>
                <DeleteTaskIcon />
              </div>
            </Button>

            <Button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50! hover:bg-blue-100"
            >
              <div>
                <EditTaskIcon />
              </div>
            </Button>
          </div>
        </div>

        <div className="w-52 flex flex-col justify-between py-2 relative">
          <div className="absolute right-3 top-8 bottom-8 w-px bg-gray-200 z-0"></div>

          <div className="flex items-start justify-end gap-4 relative z-10 text-right">
            <div>
              <span className="block text-xs text-secondary-gray text-left font-medium mb-1">
                Date Created
              </span>
              <span className="block text-sm font-bold">
                {new Date(task.createdAt)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, " / ")}
              </span>
            </div>

            <div className="h-6 w-6 rounded-full border-2 border-primary-blue bg-white flex items-center justify-center mt-1"></div>
          </div>

          <div className="flex items-start justify-end gap-4 relative z-10 text-right mt-16">
            <div>
              <span className="block text-left text-xs text-secondary-gray font-medium mb-1">
                Due Date
              </span>
              <span className="block text-sm font-bold text-primary-dark-blue">
                {new Date(task.dueDate)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, " / ")}
              </span>
            </div>
            <div className="h-6 w-6 rounded-full border-2 border-primary-blue bg-white flex items-center justify-center mt-1">
              <div className="h-3 w-3 rounded-full bg-primary-blue"></div>
            </div>
          </div>
        </div>
      </div>

      <TaskFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(data) =>
          updateMutation.mutate(data, {
            onSuccess: () => setIsEditOpen(false),
          })
        }
        initialData={{
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
        }}
        isLoading={updateMutation.isPending}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Task"
        description={
          <>
            Are you sure you delete the task{" "}
            <strong className="text-primary-dark-blue">'{task.title}'</strong>?
            This task is {task.status === "todo" ? "pending" : "in-progress"}?
          </>
        }
        confirmText="Yes"
        undoText="No"
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  );
};

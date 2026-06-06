import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskDateField from "../components/tasks/TaskDateField";
import TaskStatusBadge from "../components/tasks/TaskStatusBadge";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import BackArrowIcon from "../components/ui/icons/BackArrowIcon";
import BreadcrumbsIcon from "../components/ui/icons/BreadcrumbsIcon";
import DeleteTaskIcon from "../components/ui/icons/DeleteTaskIcon";
import EditTaskIcon from "../components/ui/icons/EditTaskIcon";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { TaskFormModal } from "../components/ui/TaskFormModal";
import { STATUS_DETAIL_CONFIG } from "../constants/statusConfig";
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
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
        <h2 className="text-2xl font-bold text-primary-dark-blue">
          Task not found
        </h2>
        <p className="text-secondary-gray">
          This task does not exist or you do not have access to it.
        </p>
        <Link to="/tasks">
          <Button>Back to Tasks</Button>
        </Link>
      </div>
    );
  }

  const statusConfig = STATUS_DETAIL_CONFIG[task.status];

  const handleStatusTransition = () => {
    if (task.status === "todo") {
      updateMutation.mutate({ status: "in_progress" });
    } else if (task.status === "in_progress") {
      updateMutation.mutate({ status: "done" });
    }
  };

  return (
    <div className="w-full p-6 lg:p-12">
      {/* Хлебные крошки */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          to="/tasks"
          className="text-3xl font-semibold text-primary-dark-blue hover:underline"
        >
          Tasks
        </Link>
        <BreadcrumbsIcon />
        <span className="font-medium text-primary-dark-blue break-all">
          {task.title}
        </span>
      </div>

      <Link
        to="/tasks"
        className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 transition-transform hover:scale-105"
      >
        <BackArrowIcon />
      </Link>

      <div className="relative flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 rounded-3xl border border-gray-100 bg-white p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-4 text-3xl font-medium">{task.title}</h1>

          <div className="mb-6">
            <TaskStatusBadge status={task.status} size="md" />
          </div>

          <p className="mb-12 text-secondary-gray whitespace-pre-wrap">
            {task.description}
          </p>

          <div className="mt-auto flex flex-wrap justify-center lg:justify-start items-center gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 font-medium disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
              onClick={handleStatusTransition}
              disabled={statusConfig.btnDisabled || updateMutation.isPending}
            >
              {statusConfig.btnText}
            </Button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-start">
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
        </div>

        <div className="hidden lg:flex relative w-52 flex-col justify-between py-2">
          <div className="absolute top-8 right-3 bottom-8 z-0 w-px bg-gray-200" />

          <TaskDateField label="Date Created" value={task.createdAt} />

          <div className="mt-16">
            <TaskDateField label="Due Date" value={task.dueDate} highlighted />
          </div>
        </div>

        <div className="lg:hidden w-full flex flex-row items-center justify-between mt-6 pt-6 border-t border-gray-100">
          <div className="flex justify-start">
            <TaskDateField label="Date Created" value={task.createdAt} />
          </div>

          <div className="flex-1 h-px bg-gray-200 mb-2" />

          <div className="flex justify-end [&>div]:flex-row-reverse [&>div]:text-right text-right">
            <TaskDateField label="Due Date" value={task.dueDate} highlighted />
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
          description: task.description ?? "",
          dueDate: task.dueDate ?? "",
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
            Are you sure you want to delete the task{" "}
            <strong className="text-primary-dark-blue">
              &apos;{task.title}&apos;
            </strong>
            ?
          </>
        }
        confirmText="Yes"
        undoText="No"
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  );
};

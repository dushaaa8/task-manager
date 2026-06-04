import { useState } from "react";
import EmptyTasksPlaceholder from "../components/layout/EmptyTasksPlaceholder";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Selector from "../components/ui/Selector";
import {
  TaskFormModal,
  type TaskFormData,
} from "../components/ui/TaskFormModal";
import type { TaskStatus } from "../components/ui/TaskItem";
import TaskItem from "../components/ui/TaskItem";
import { useTasksList } from "../hooks/useTasks";
import { useCreateTask } from "../hooks/useTaskMutation";

const sortOptions = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
  { value: "priority-desc", label: "Highest Priority" },
  { value: "priority-asc", label: "Lowest Priority" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "updatedAt-desc", label: "Recently Updated" },
];

export const Tasks = () => {
  const {
    activeTab,
    setActiveTab,
    sortValue,
    setSortValue,
    counts,
    displayedTasks,
    isLoading,
    isAbsolutelyEmpty,
  } = useTasksList();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const createMutation = useCreateTask();

  const handleFormSubmit = (data: TaskFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAbsolutelyEmpty) {
    return (
      <>
        <EmptyTasksPlaceholder modalFunction={setIsModalOpen} />
        <TaskFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          isLoading={createMutation.isPending}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen p-12">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-primary-dark-blue">
            Tasks
          </h1>
          <p className="text-secondary-gray">Your tasks in your space.</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>Create Task</Button>

        <TaskFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          isLoading={createMutation.isPending}
        />
      </div>

      <div className="flex justify-between w-full h-20 items-end mb-8">
        <div className="flex gap-8 border-b border-gray-200">
          {[
            { id: "all", label: "All Tasks", count: counts.all },
            { id: "todo", label: "Pending", count: counts.todo },
            {
              id: "in_progress",
              label: "In Progress",
              count: counts.inProgress,
            },
            { id: "done", label: "Completed", count: counts.done },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TaskStatus | "all")}
                className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "border-primary-blue text-primary-blue"
                    : "border-transparent text-secondary-gray"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs ${
                    isActive
                      ? "bg-blue-50 text-primary-blue"
                      : "bg-gray-100 text-secondary-gray"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-88">
          <Selector
            label="Choose sort option"
            options={sortOptions}
            value={sortValue}
            onChange={setSortValue}
          />
        </div>
      </div>

      {displayedTasks.length === 0 ? (
        <div className="py-12 text-center text-secondary-gray">
          No tasks found in this category.
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-5">
          {displayedTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              id={task.id}
              index={index + 1}
              title={task.title}
              status={task.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

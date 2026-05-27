import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api } from "../api/api";
import EmptyTasksPlaceholder from "../components/layout/EmptyTasksPlaceholder";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import type { TaskStatus } from "../components/ui/TaskItem";
import TaskItem from "../components/ui/TaskItem";

export interface ITaskResponse {
  id: string;
  title: string;
  status: TaskStatus;
}

export const Tasks = () => {
  const [activeTab, setActiveTab] = useState<TaskStatus | "all">("all");

  const { data: allTasks = [], isLoading } = useQuery<ITaskResponse[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get("/tasks");
      return response.data;
    },
  });

  const counts = useMemo(
    () => ({
      all: allTasks.length,
      todo: allTasks.filter((t) => t.status === "todo").length,
      inProgress: allTasks.filter((t) => t.status === "in_progress").length,
      done: allTasks.filter((t) => t.status === "done").length,
    }),
    [allTasks],
  );

  const displayedTasks = useMemo(() => {
    if (activeTab === "all") return allTasks;
    return allTasks.filter((task) => task.status === activeTab);
  }, [allTasks, activeTab]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (allTasks.length === 0) {
    return <EmptyTasksPlaceholder />;
  }

  return (
    <div className="min-h-screen p-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-primary-dark-blue">
            Tasks
          </h1>
          <p className="text-secondary-gray">Your tasks in your space.</p>
        </div>
        <Button size="lg">Create Task</Button>
      </div>

      <div className="flex justify-between w-full">
        <div className="mb-8 flex gap-8 border-b border-gray-200">
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
                className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
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
        <div>selector here !</div>
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

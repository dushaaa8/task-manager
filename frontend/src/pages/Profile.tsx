import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { api } from "../api/api";
import Button from "../components/ui/Button";
import SuggestCreateTaskIcon from "../components/ui/icons/SuggestCreateTaskIcon";
import TaskViewBtnIcon from "../components/ui/icons/TaskViewBtnIcon";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import TaskItem from "../components/ui/TaskItem";
import { useUser } from "../hooks/useUser";
import type { Task } from "../types";

export default function Profile() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [showBanner, setShowBanner] = useState(true);
  const selectedDate = useOutletContext<string>();

  const { data: allTasks = [], isLoading: isTasksLoading } = useQuery<Task[]>({
    queryKey: ["tasks", "createdAt-desc"],
    queryFn: async () => {
      const response = await api.get<Task[]>("/tasks", {
        params: { sortBy: "createdAt", sortOrder: "desc" },
      });
      return response.data;
    },
  });

  const tasksForSelectedDate = useMemo(() => {
    const targetDateString = selectedDate.split("T")[0];

    return allTasks.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      return task.dueDate.split("T")[0] === targetDateString;
    });
  }, [allTasks, selectedDate]);

  if (isUserLoading || isTasksLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="px-6 lg:px-12 py-8">
      <div className="flex gap-5 pb-8">
        <div className="text-6xl">👋</div>
        <div>
          <h1 className="pb-2 text-4xl font-semibold">Hi {user.name},</h1>
          <h2 className="text-xl text-secondary-gray">
            Welcome to Semicolon Task Management
          </h2>
        </div>
      </div>

      {showBanner && (
        <div className="relative mb-12 flex overflow-hidden rounded-4xl shadow-md">
          <img
            className="absolute z-0 h-full w-full object-cover"
            src="https://i.ibb.co/6JYb4qSp/Frame-419-2.png"
            alt="Profile banner"
          />
          <button
            type="button"
            className="absolute top-1 right-5 z-20 cursor-pointer p-2 text-xl text-white"
            onClick={() => setShowBanner(false)}
          >
            ✕
          </button>
          <div className="relative z-10 flex w-full justify-between px-10 py-16">
            <p className="text-xl leading-snug font-semibold text-white">
              Motivation to help <br /> you work.
            </p>
            <Link to="/tasks">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      )}

      {allTasks.length === 0 ? (
        <div className="group flex items-center justify-between rounded-2xl border-2 border-transparent bg-white p-5 transition-all duration-200 hover:border-primary-blue">
          <div className="flex items-center gap-3">
            <SuggestCreateTaskIcon />
            <p className="text-secondary-gray transition-all duration-200 group-hover:font-semibold group-hover:text-primary-blue">
              Create your First Task in your Workspace
            </p>
          </div>
          <Link
            to="/tasks"
            className="flex gap-3 border-b border-transparent font-semibold text-primary-blue transition-all duration-200 hover:border-primary-blue"
          >
            Create Task <TaskViewBtnIcon />
          </Link>
        </div>
      ) : tasksForSelectedDate.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 px-6 py-8 text-center text-secondary-gray">
          No tasks planned for this day. Click on another date in the calendar!
        </div>
      ) : (
        <div>
          <h2 className="mb-6 text-2xl font-bold text-primary-dark-blue">
            Tasks for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {tasksForSelectedDate.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                index={index + 1}
                title={task.title}
                status={task.status}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

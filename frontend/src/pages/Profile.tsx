import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { api } from "../api/api";
import Button from "../components/ui/Button";
import SuggestCreateTaskIcon from "../components/ui/icons/SuggestCreateTaskIcon";
import TaskViewBtnIcon from "../components/ui/icons/TaskViewBtnIcon";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import TaskItem from "../components/ui/TaskItem";
import type { ITaskResponse } from "../hooks/useTasks";
import { useUser } from "../hooks/useUser";

export default function Profile() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [showBanner, setShowBanner] = useState(true);
  const selectedDate = useOutletContext<string>();

  const { data: allTasks = [], isLoading: isTasksLoading } = useQuery({
    queryKey: ["tasks", "createdAt-desc"],
    queryFn: async () => {
      const response = await api.get("/tasks", {
        params: { sortBy: "createdAt", sortOrder: "desc" },
      });
      return response.data;
    },
  });

  const tasksForSelectedDate = useMemo(() => {
    const targetDateString = selectedDate.split("T")[0];
    return allTasks.filter((task: ITaskResponse) => {
      if (!task.dueDate) return false;
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
    <div className="py-8 px-12">
      <div className="flex gap-5 pb-8">
        <div className="text-6xl">👋</div>
        <div>
          <h1 className="font-semibold text-4xl pb-2">Hi {user.name},</h1>
          <h2 className="text-xl text-secondary-gray">
            Welcome to Semicolon Task Management
          </h2>
        </div>
      </div>
      {showBanner && (
        <div className="relative flex rounded-4xl overflow-hidden mb-12 shadow-md">
          <img
            className="w-full absolute z-0 h-full object-cover"
            src="https://i.ibb.co/6JYb4qSp/Frame-419-2.png"
            alt="Profile banner"
          />
          <button
            className="absolute top-1 right-5 text-white text-xl cursor-pointer z-20 p-2"
            onClick={() => setShowBanner(false)}
          >
            ✕
          </button>
          <div className="flex justify-between w-full py-16 px-10 relative z-10">
            <div>
              <p className="text-white text-3xl font-semibold leading-snug">
                Motivation to help <br /> you work.
              </p>
            </div>
            <div className="flex items-center">
              <Link to={"/tasks"}>
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div>
        {allTasks.length === 0 ? (
          <div className="w-full flex flex-col ">
            <div className="group bg-white rounded-2xl flex items-center justify-between p-5 border-2 border-transparent transition-all duration-200 hover:border-primary-blue">
              <div className="flex items-center gap-3">
                <SuggestCreateTaskIcon />

                <p className="text-secondary-gray transition-all duration-200 group-hover:text-primary-blue group-hover:font-semibold">
                  Create your First Task in your Workspace
                </p>
              </div>

              <Link
                to={`/tasks`}
                className="text-primary-blue font-semibold flex gap-3 border-b border-transparent transition-all duration-200 hover:border-primary-blue"
              >
                Create Task <TaskViewBtnIcon />
              </Link>
            </div>
          </div>
        ) : tasksForSelectedDate.length === 0 ? (
          <div className="py-8 px-6 text-center rounded-2xl border-2 border-dashed border-gray-200 text-secondary-gray">
            No tasks planned for this day. Click on another date in the
            calendar!
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-primary-dark-blue mb-6">
              Tasks for{" "}
              {new Date(selectedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </h2>
            <div className="grid gap-5 grid-cols-5 ">
              {tasksForSelectedDate.map((task: any, index: number) => (
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
    </div>
  );
}

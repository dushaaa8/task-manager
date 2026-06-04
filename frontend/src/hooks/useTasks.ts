import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api } from "../api/api";
import type { TasksPriority, TaskStatus } from "../components/ui/TaskItem";

export interface ITaskResponse {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TasksPriority;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export const useTasksList = () => {
  const [activeTab, setActiveTab] = useState<TaskStatus | "all">("all");
  const [sortValue, setSortValue] = useState<string>("createdAt-desc");

  const { data: allTasks = [], isLoading } = useQuery<ITaskResponse[]>({
    queryKey: ["tasks", sortValue],
    queryFn: async () => {
      const [sortBy, sortOrder] = sortValue.split("-");
      const response = await api.get("/tasks", {
        params: { sortBy, sortOrder },
      });
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

  return {
    activeTab,
    setActiveTab,
    sortValue,
    setSortValue,
    counts,
    displayedTasks,
    isLoading,
    isAbsolutelyEmpty: allTasks.length === 0,
  };
};

export const useSingleTask = (id: string | undefined) => {
  return useQuery<ITaskResponse>({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    },
  });
};

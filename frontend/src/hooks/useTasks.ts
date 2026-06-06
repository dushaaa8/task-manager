import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api } from "../api/api";
import type { Task, TaskStatus } from "../types";

export const useTasksList = () => {
  const [activeTab, setActiveTab] = useState<TaskStatus | "all">("all");
  const [sortValue, setSortValue] = useState("createdAt-desc");

  const { data: allTasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks", sortValue],
    queryFn: async () => {
      const [sortBy, sortOrder] = sortValue.split("-");
      const response = await api.get<Task[]>("/tasks", {
        params: { sortBy, sortOrder },
      });
      return response.data;
    },
  });

  const counts = useMemo(
    () => ({
      all: allTasks.length,
      todo: allTasks.filter((task) => task.status === "todo").length,
      inProgress: allTasks.filter((task) => task.status === "in_progress").length,
      done: allTasks.filter((task) => task.status === "done").length,
    }),
    [allTasks],
  );

  const displayedTasks = useMemo(() => {
    if (activeTab === "all") {
      return allTasks;
    }

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
  return useQuery<Task>({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

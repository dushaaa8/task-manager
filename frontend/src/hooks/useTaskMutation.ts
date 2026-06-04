import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import type { TaskFormData } from "../components/ui/TaskFormModal";
import type { TaskStatus, TasksPriority } from "../components/ui/TaskItem";

interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: TasksPriority;
  status?: TaskStatus;
}

export const useUpdateTask = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedFields: UpdateTaskPayload) =>
      api.patch(`/tasks/${id}`, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/tasks", { replace: true });
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: TaskFormData) => api.post("/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

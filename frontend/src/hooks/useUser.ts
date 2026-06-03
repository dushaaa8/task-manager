import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import type { IUserResponse } from "../components/layout/MainLayout";

export const useUser = () => {
  return useQuery<IUserResponse>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/users/me");
      return response.data;
    },

    staleTime: 5 * 60 * 1000,
  });
};

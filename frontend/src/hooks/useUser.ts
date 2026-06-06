import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import type { UserProfile } from "../types";

export const useUser = () => {
  return useQuery<UserProfile>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<UserProfile>("/users/me");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

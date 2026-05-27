import { Outlet } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import LeftSidebar from "./LeftSidebar";
import MainHeader from "./MainHeader";
import RightSidebar from "./RightSidebar";

export interface IUserResponse {
  email: string;
  name: string;
}

export default function MainLayout() {
  const { data: user, isLoading } = useQuery<IUserResponse>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/users/me");
      return response.data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex h-screen w-full bg-main-background-gray overflow-hidden">
        <LoadingSpinner />
      </div>
    );
  }

  if (user)
    return (
      <div className="flex h-screen w-full bg-main-background-gray overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <MainHeader />
            <Outlet />
          </main>
        </div>

        <RightSidebar name={user.name} email={user.email} />
      </div>
    );
}

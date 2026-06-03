import { Navigate, Outlet } from "react-router-dom";

import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import LoadingSpinner from "../ui/LoadingSpinner";
import LeftSidebar from "./LeftSidebar";
import MainHeader from "./MainHeader";
import RightSidebar from "./RightSidebar";

export interface IUserResponse {
  email: string;
  name: string;
}

export function MainLayout() {
  const { data: user, isLoading } = useUser();
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    new Date().toISOString(),
  );
  if (isLoading) {
    return (
      <div className="flex h-screen w-full bg-main-background-gray overflow-hidden">
        <LoadingSpinner />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-main-background-gray overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <MainHeader />
          <Outlet context={selectedDate} />
        </main>
      </div>

      <RightSidebar
        name={user.name}
        email={user.email}
        onDateChange={setSelectedDate}
      />
    </div>
  );
}

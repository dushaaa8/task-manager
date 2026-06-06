import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import LoadingSpinner from "../ui/LoadingSpinner";
import LeftSidebar from "./LeftSidebar";
import MainHeader from "./MainHeader";
import RightSidebar from "./RightSidebar";

export function MainLayout() {
  const { data: user, isLoading } = useUser();
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString(),
  );

  if (isLoading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-main-background-gray">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-main-background-gray">
      <LeftSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto lg:p-6">
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

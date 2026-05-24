import { Outlet } from "react-router-dom";
import Sidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-main-background-gray overflow-hidden text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="text-gray-400">Some items</div>
          <div className="text-gray-400">Notifications</div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <RightSidebar />
    </div>
  );
}

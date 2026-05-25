import { Outlet } from "react-router-dom";
import Notifications from "../ui/icons/NotificationsIcon";
import SearchIcon from "../ui/icons/SearchIcon";
import { Input } from "../ui/Input";
import Sidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-main-background-gray overflow-hidden text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-25 flex items-center justify-between px-12 shrink-0">
          <Input
            className="w-89"
            placeholder="Seacrh your Tasks here..."
            iconRight={<SearchIcon />}
            iconRightFunc={() => console.log("input clicked")}
          />
          <Notifications />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <RightSidebar />
    </div>
  );
}

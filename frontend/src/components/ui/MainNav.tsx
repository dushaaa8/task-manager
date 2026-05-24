import NavIconOverview from "./icons/NavIconOverview";
import NavIconSettings from "./icons/NavIconSettings";
import NavIconTasks from "./icons/NavIconTasks";
import NavItem from "./NavItem";

export default function MainNav() {
  return (
    <nav className="flex flex-col gap-2 w-full">
      <NavItem to="/profile" label="Overview" icon={NavIconOverview} />

      <NavItem to="/tasks" label="Tasks" icon={NavIconTasks} />

      <NavItem to="/settings" label="Settings" icon={NavIconSettings} />
    </nav>
  );
}

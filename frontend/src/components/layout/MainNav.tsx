import NavIconOverview from "../ui/icons/NavIconOverview";
import NavIconSettings from "../ui/icons/NavIconSettings";
import NavIconTasks from "../ui/icons/NavIconTasks";
import NavItem from "../ui/NavItem";

export default function MainNav() {
  return (
    <nav className="flex flex-col gap-2 w-full">
      <NavItem to="/profile" label="Overview" icon={NavIconOverview} />

      <NavItem to="/tasks" label="Tasks" icon={NavIconTasks} />

      <NavItem to="/settings" label="Settings" icon={NavIconSettings} />
    </nav>
  );
}

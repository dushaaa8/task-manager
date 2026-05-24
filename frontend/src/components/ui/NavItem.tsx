import { NavLink } from "react-router-dom";
import SideBarEffect from "./icons/SideBarEffect";

interface Props {
  to: string;
  label: string;
  icon: React.ElementType<{ isActive: boolean }>;
}

export default function NavItem({ to, label, icon: Icon }: Props) {
  const activeNav = "font-bold text-primary-blue";
  const nonActiveNav = "text-secondary-gray";
  return (
    <NavLink to={to} className="flex items-center gap-2 h-12">
      {({ isActive }) => (
        <>
          <SideBarEffect isActive={isActive} />

          <Icon isActive={isActive} />

          <span className={isActive ? activeNav : nonActiveNav}>{label}</span>
        </>
      )}
    </NavLink>
  );
}

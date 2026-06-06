import { Link } from "react-router-dom";
import type { UserProfile } from "../../types";
import Button from "../ui/Button";
import Calendar from "../ui/Calendar";

interface RightSidebarProps extends UserProfile {
  onDateChange: (date: string) => void;
}

const PROFILE_IMAGE_URL =
  "https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg";

export default function RightSidebar({
  email,
  name,
  onDateChange,
}: RightSidebarProps) {
  return (
    <aside className="hidden m-5 lg:flex w-67 flex-col items-center rounded-3xl bg-white pt-24">
      <div className="relative flex flex-col items-center">
        <div className="relative mb-3 h-23 w-23">
          <img
            className="h-full w-full rounded-2xl object-cover"
            src={PROFILE_IMAGE_URL}
            alt="Profile"
          />
          <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full border-2 border-white bg-green-500" />
        </div>
        <h3 className="pb-1 text-xl font-bold text-primary-dark-blue">
          {name}
        </h3>
        <p className="pb-5 text-sm text-secondary-gray">{email}</p>
        <Link to="/profile">
          <Button size="sm" className="mb-14 px-4">
            My Profile
          </Button>
        </Link>
      </div>
      <Calendar onDateSelect={(date) => onDateChange(date.toISOString())} />
    </aside>
  );
}

import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Calendar from "../ui/Calendar";
import type { IUserResponse } from "./MainLayout";

export default function RightSidebar({ email, name }: IUserResponse) {
  const handleDateFilter = (date: Date) => {
    console.log("Selected date", date.toISOString());
  };
  return (
    <aside className="w-67 m-5 bg-white rounded-3xl flex flex-col items-center pt-24">
      <div className="flex flex-col items-center relative">
        <div className="relative w-23 h-23 mb-3">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src="https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg"
            alt="Profile image"
          />
          <div className="absolute -right-3 -top-3 w-8 h-8 bg-semantic-success-green rounded-full border-2 border-white"></div>
        </div>
        <h3 className="font-bold text-xl text-primary-dark-blue pb-1">
          {name}
        </h3>
        <h5 className="text-secondary-gray text-sm pb-5">{email}</h5>
        <Link to="/profile">
          <Button size="sm" className="px-4! mb-14">
            My Profile
          </Button>
        </Link>
      </div>
      <Calendar onDateSelect={handleDateFilter} />
    </aside>
  );
}

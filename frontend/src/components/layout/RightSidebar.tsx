import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function RightSidebar() {
  return (
    <aside className="w-67 m-5 bg-white rounded-3xl flex flex-col items-center pt-24">
      <div className="flex flex-col items-center relative">
        <div className="relative w-23 h-23 mb-3">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-12.webp"
            alt="Profile"
          />
          <div className="absolute -right-3 -top-3 w-8 h-8 bg-semantic-success-green rounded-full border-2 border-white"></div>
        </div>

        <h3 className="font-bold text-xl text-primary-dark-blue pb-1">
          Name Surname
        </h3>
        <h2 className="text-secondary-gray text-sm pb-5">
          namesurname@gmail.com
        </h2>
        <Link to="/profile">
          <Button size="sm" className="px-4!">
            My Profile
          </Button>
        </Link>
      </div>
    </aside>
  );
}

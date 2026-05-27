import NotificationsIcon from "../ui/icons/NotificationsIcon";
import SearchIcon from "../ui/icons/SearchIcon";
import { Input } from "../ui/Input";

export default function MainHeader() {
  return (
    <header className="h-25 flex items-center justify-between px-12 shrink-0">
      <Input
        className="w-89"
        placeholder="Seacrh your Tasks here..."
        iconRight={<SearchIcon />}
        iconRightFunc={() => console.log("input clicked")}
      />
      <NotificationsIcon />
    </header>
  );
}

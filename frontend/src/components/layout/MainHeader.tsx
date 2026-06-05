import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotificationsIcon from "../ui/icons/NotificationsIcon";
import SearchIcon from "../ui/icons/SearchIcon";
import { Input } from "../ui/Input";

export default function MainHeader() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();

    if (trimmedValue) {
      navigate(`/tasks?search=${encodeURIComponent(trimmedValue)}`);
    } else {
      navigate("/tasks");
    }
  };
  return (
    <header className="h-25 flex items-center justify-between px-12 shrink-0">
      <Input
        className="w-89"
        value={searchValue}
        placeholder="Seacrh your Tasks here..."
        onChange={(e) => setSearchValue(e.target.value)}
        iconRight={<SearchIcon />}
        iconRightFunc={handleSearch}
      />
      <NotificationsIcon />
    </header>
  );
}

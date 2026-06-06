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
    <header className="flex h-25 shrink-0 items-center justify-between px-6 lg:px-12">
      <Input
        className="w-89"
        value={searchValue}
        placeholder="Search your tasks here..."
        onChange={(e) => setSearchValue(e.target.value)}
        iconRight={<SearchIcon />}
        iconRightFunc={handleSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <NotificationsIcon />
    </header>
  );
}

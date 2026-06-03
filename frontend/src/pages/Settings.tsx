import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import UserEmailIcon from "../components/ui/icons/UserEmailIcon";
import UserSettingsIcon from "../components/ui/icons/UserSettingsIcon";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useUser } from "../hooks/useUser";

export default function Settings() {
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading } = useUser();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutOpen(false);
    navigate("/login");
  };

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-12 w-full">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-primary-dark-blue">Settings</h1>
        <Button
          className="bg-primary-wine"
          onClick={() => setIsLogoutOpen(true)}
        >
          Log Out
        </Button>

        <ConfirmModal
          isOpen={isLogoutOpen}
          onClose={() => setIsLogoutOpen(false)}
          title="You are about to LogOut"
          description="You can always log on to your task manager and continue from where you left off."
          confirmText="Yes, Log Me Out"
          onConfirm={handleLogout}
        />
      </div>

      <section>
        <h2 className="text-lg font-semibold text-primary-dark-blue mb-4">
          Account Settings
        </h2>

        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-4">
          <div className="flex items-center gap-5 rounded-2xl border border-gray-200 p-5">
            <UserSettingsIcon />

            <div className="flex flex-col">
              <span className="text-xs text-secondary-gray mb-1">Fullname</span>
              <span className="font-bold text-primary-dark-blue">
                {user.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-2xl border border-gray-200 p-5">
            <UserEmailIcon />
            <div className="flex flex-col">
              <span className="text-xs text-secondary-gray mb-1">
                Email Address
              </span>
              <span className="font-bold text-primary-dark-blue">
                {user.email}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-5">
            <div className="flex flex-col">
              <span className="text-xs text-secondary-gray mb-1">Password</span>
              <span className="font-bold text-primary-dark-blue text-lg tracking-[0.25em] mt-1">
                ••••••••••••
              </span>
            </div>
          </div>
          <Button size="lg" className="w-31 self-end">
            Edit
          </Button>
        </div>
      </section>
    </div>
  );
}

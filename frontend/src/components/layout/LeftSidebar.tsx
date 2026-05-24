import MainNav from "../ui/MainNav";

export default function Sidebar() {
  return (
    <aside className="w-70 h-full bg-white flex">
      <div className="w-20 h-full bg-primary-blue pt-25">
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-12 h-12 rounded-xl p-1 bg-primary-blue border-primary-yellow border-[1.4px]"
            src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-12.webp"
            alt="profile image"
          />
        </div>
      </div>
      <div className="pt-25 w-full">
        <div className="pl-5 pb-23">
          <h3 className="font-bold text-xl text-primary-dark-blue pb-1">
            My Space
          </h3>
          <h2 className="text-secondary-gray text-sm">Workspace Title</h2>
        </div>
        <MainNav />
      </div>
    </aside>
  );
}

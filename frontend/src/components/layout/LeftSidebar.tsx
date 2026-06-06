import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className="w-50 lg:w-70 h-full bg-white flex">
      <div className="w-20 h-full bg-primary-blue pt-25">
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-12 h-12 rounded-xl p-1 bg-primary-blue border-primary-yellow border-[1.4px]"
            src="https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg"
            alt="profile image"
          />
        </div>
      </div>
      <div className="pt-25 w-full">
        <div className="pl-5 pb-23">
          <h4 className="font-bold text-xl text-primary-dark-blue pb-1">
            My Space
          </h4>
          <h6 className="text-secondary-gray text-sm">Main Workspace</h6>
        </div>
        <MainNav />
      </div>
    </aside>
  );
}

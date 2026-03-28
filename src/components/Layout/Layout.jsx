import { Outlet } from "react-router-dom";
import FooterPlayer from "./FooterPlayer";
import Header from "./Header";
import PageNavigation from "./PageNavigation";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen bg-transparent text-slate-50">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-3 pb-56 pt-16 sm:px-4 sm:pb-52 sm:pt-20 md:px-8 md:pb-36 xl:pt-6">
          <div className="mx-auto w-full max-w-7xl">
            <PageNavigation />
            <Outlet />
          </div>
        </main>
        <FooterPlayer />
      </div>
    </div>
  );
}

export default Layout;

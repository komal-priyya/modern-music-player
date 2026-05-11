// 

import { Outlet } from "react-router-dom";
import FooterPlayer from "./FooterPlayer";
import Header from "./Header";
import PageNavigation from "./PageNavigation";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-transparent text-slate-50">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />

        <main
          className="
            flex-1
            px-2
            pt-16
            pb-56
            sm:px-4
            sm:pt-20
            sm:pb-52
            md:px-6
            md:pb-40
            lg:px-8
            xl:pt-6
          "
        >
          <div className="mx-auto w-full max-w-7xl overflow-hidden">
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
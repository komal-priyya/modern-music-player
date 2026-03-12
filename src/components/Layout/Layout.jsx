import Sidebar from "./Sidebar";
import Header from "./Header";
import FooterPlayer from "./FooterPlayer";

function Layout({ children }) {

return (

<div className="flex h-screen bg-gray-100">

<Sidebar />

<div className="flex flex-col flex-1">

<Header />

<div className="flex-1 p-6 overflow-y-auto">

{children}

</div>

<FooterPlayer />

</div>

</div>

);

}

export default Layout;
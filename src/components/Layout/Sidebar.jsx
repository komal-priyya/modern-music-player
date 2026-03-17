import { useState } from "react";

function Sidebar() {

const [open, setOpen] = useState(false);

return (

<>

{/* Mobile Toggle Button */}

<button
onClick={() => setOpen(!open)}
className="md:hidden fixed top-4 left-4 z-50 bg-indigo-500 text-white p-2 rounded-lg shadow"
>
☰
</button>

{/* Sidebar */}

<div
className={`fixed md:static top-0 left-0 h-screen w-64 
bg-white border-r shadow-lg p-6
transform ${open ? "translate-x-0" : "-translate-x-full"} 
md:translate-x-0 transition-transform duration-300`}
>

{/* Logo */}

<h2 className="text-2xl font-bold mb-10 text-indigo-600 flex items-center gap-2">
🎧 Muzify
</h2>

{/* Menu */}

<ul className="space-y-3 text-gray-600 font-medium">

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
🏠 Home
</li>

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
🔎 Search
</li>

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
⭐ Top Artist
</li>

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
🔥 New To You
</li>

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
🎧 Mood Music
</li>

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
🕘 Recently Played
</li>

<hr className="my-4"/>

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
📂 Playlists
</li>

<li className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition">
❤️ Liked Songs
</li>

</ul>

</div>

</>

);

}

export default Sidebar;
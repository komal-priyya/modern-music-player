function Sidebar() {

return (

<div className="w-64 bg-white border-r p-6">

<h2 className="text-xl font-bold mb-8">
🎧 Muzify
</h2>

<ul className="space-y-4 text-gray-700">

<li className="cursor-pointer hover:text-black">
Home
</li>

<li className="cursor-pointer hover:text-black">
Search
</li>


<li className="cursor-pointer hover:text-black">
Top Artist
</li>



<li className="cursor-pointer hover:text-black">
New To You
</li>

<li className="cursor-pointer hover:text-black">
Mood Music
</li>

<li className="cursor-pointer hover:text-black">
Recently Played
</li>

<hr />

<li className="cursor-pointer hover:text-black">
Playlists
</li>

<li className="cursor-pointer hover:text-black">
Liked Songs
</li>

</ul>

</div>

);

}

export default Sidebar;
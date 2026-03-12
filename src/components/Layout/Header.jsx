function Header() {

return (

<div className="bg-white border-b p-4 flex items-center justify-between">

<input
type="text"
placeholder="Search music..."
className="bg-gray-100 px-4 py-2 rounded w-96"
/>

<div className="flex items-center gap-4">

<button className="text-sm">
🌙 Theme
</button>

<button>
🔔
</button>

<button>
👤
</button>

</div>

</div>

);

}

export default Header;
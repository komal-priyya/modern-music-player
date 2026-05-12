


import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { Bell, Compass, Library, MessageCircle, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";
import ProfileMenu from "./ProfileMenu";

const quickLinks = [
  { label: "Discover", path: "/", icon: <Compass size={15} />, activeClass: "border-sky-400/40 bg-sky-400/20" },
  { label: "Search", path: "/search", icon: <Search size={15} />, activeClass: "border-orange-400/40 bg-orange-400/20" },
  { label: "Assistant", path: "/assistant", icon: <MessageCircle size={15} />, activeClass: "border-pink-400/40 bg-pink-400/20" },
  { label: "Library", path: "/library", icon: <Library size={15} />, activeClass: "border-violet-400/40 bg-violet-400/20" },
];

function Header() {
  const navigate = useNavigate();
  const { currentTrack, library, isCloudSyncEnabled } = usePlayer();
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
  });

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      navigate("/search");
      return;
    }

    startTransition(() => {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    });
  }

  function handleStatusClick() {
    navigate("/library");
  }

  function handleBellClick() {
    toast.success(isCloudSyncEnabled ? "Cloud sync is on" : "Using local storage right now");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950 px-3 py-3 sm:px-4 sm:py-4 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center 2xl:justify-between">
          {/* <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 2xl:overflow-visible">
            {quickLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                    isActive
                      ? `border ${item.activeClass} text-white`
                      : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div> */}

          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex sm:flex-wrap sm:items-stretch sm:gap-3">
            <button
              type="button"
              onClick={handleStatusClick}
              className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-left text-sm text-slate-200 transition hover:border-orange-300/40 sm:flex-none sm:px-4"
            >
              <p className="font-medium text-slate-50">
                {currentTrack ? currentTrack.title : `${library.liked.length} liked songs`}
              </p>
              <p className="truncate text-xs text-slate-300">
                {currentTrack ? currentTrack.artist : "Open library"}
              </p>
            </button>

            <button
              type="button"
              onClick={handleBellClick}
              className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-slate-200 transition hover:border-sky-400/40 hover:bg-slate-800"
              title={isCloudSyncEnabled ? "Cloud sync on" : "Local mode"}
            >
              <Bell size={18} />
            </button>

            <div className="col-span-2 sm:col-span-1">
              <ProfileMenu />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-3 text-slate-200 sm:px-4"
        >
          <Search size={18} className="text-slate-300" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search songs, artists, moods..."
            className="min-w-0 w-full bg-transparent outline-none placeholder:text-slate-400"
          />
        </form>
      </div>
    </header>
  );
}

export default Header;

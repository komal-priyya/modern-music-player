import { startTransition, useState } from "react";
import { Bell, Compass, Library, MessageCircle, Search, Sparkles } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";
import ProfileMenu from "./ProfileMenu";

const quickLinks = [
  { label: "Discover", path: "/", icon: <Compass size={15} /> },
  { label: "Search", path: "/search", icon: <Search size={15} /> },
  { label: "Assistant", path: "/assistant", icon: <MessageCircle size={15} /> },
  { label: "Library", path: "/library", icon: <Library size={15} /> },
];

function Header() {
  const navigate = useNavigate();
  const { currentTrack, library, isCloudSyncEnabled } = usePlayer();
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      navigate("/search");
      return;
    }

    startTransition(() => {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 px-3 py-3 backdrop-blur-2xl sm:px-4 sm:py-4 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 2xl:overflow-visible">
            {quickLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                    isActive
                      ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg shadow-pink-900/20"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex sm:flex-wrap sm:items-stretch sm:gap-3">
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300 sm:flex-none sm:px-4">
              <p className="font-medium text-slate-100">
                {currentTrack ? currentTrack.title : `${library.liked.length} liked songs`}
              </p>
              <p className="truncate text-xs text-slate-400">
                {currentTrack ? currentTrack.artist : "Ready when you are"}
              </p>
            </div>

            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:border-pink-400/40 hover:bg-pink-500/10"
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
          className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-cyan-400/10 px-3 py-3 text-slate-200 shadow-lg sm:rounded-[24px] sm:px-4"
        >
          <Search size={18} className="text-slate-300" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search songs, artists, moods..."
            className="min-w-0 w-full bg-transparent outline-none placeholder:text-slate-400"
          />
          <span className="hidden rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300 md:inline-flex">
            <Sparkles size={14} />
          </span>
        </form>
      </div>
    </header>
  );
}

export default Header;

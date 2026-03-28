import { useState } from "react";
import {
  Disc3,
  Heart,
  Home,
  Library,
  Menu,
  MessageCircle,
  Music2,
  Search,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";

const navItems = [
  { label: "Home", path: "/", icon: <Home size={18} /> },
  { label: "Search", path: "/search", icon: <Search size={18} /> },
  { label: "Assistant", path: "/assistant", icon: <MessageCircle size={18} /> },
  { label: "Library", path: "/library", icon: <Library size={18} /> },
];

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { library } = usePlayer();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-gradient-to-r from-orange-400/90 to-pink-500/90 text-white shadow-lg shadow-pink-900/20"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed left-3 top-3 z-50 rounded-full border border-white/10 bg-slate-900/80 p-3 text-white shadow-lg backdrop-blur xl:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-sm xl:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[min(290px,88vw)] px-3 py-4 transition-transform duration-300 sm:px-5 sm:py-6 xl:static xl:w-[290px] xl:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="glass-panel flex h-full flex-col overflow-hidden p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-orange-500/30 via-pink-500/25 to-cyan-400/25 blur-2xl" />

          <div className="relative flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-cyan-400 p-3 text-white shadow-lg">
              <Disc3 size={22} />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Muzify</p>
              <p className="text-sm text-slate-400">Listen with heart</p>
            </div>
          </div>

          <nav className="relative mt-8 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="relative mt-8 min-h-0 flex-1 overflow-hidden">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-500">Your Library</p>

            <div className="space-y-3 overflow-y-auto pr-1">
              <NavLink
                to="/library"
                onClick={() => setOpen(false)}
                className="block rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-white">
                    <Heart size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">Liked Songs</p>
                    <p className="text-sm text-slate-400">{library.liked.length} songs</p>
                  </div>
                </div>
              </NavLink>

              <div className="space-y-2">
                {library.playlists.map((playlist) => (
                  <NavLink
                    key={playlist.id}
                    to={`/playlist/${playlist.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-200">
                      <Music2 size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{playlist.name}</p>
                      <p className="text-xs text-slate-400">{playlist.tracks.length} songs</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

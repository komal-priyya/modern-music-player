import { useEffect, useState } from "react";
import {
  ArrowRightLeft,
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
import { NavLink, useNavigate } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";
import { getFeaturedArtists } from "../../services/musicApi";

const navItems = [
  { label: "Home", path: "/", icon: <Home size={18} />, activeClass: "border-sky-400/40 bg-sky-400/20" },
  { label: "Search", path: "/search", icon: <Search size={18} />, activeClass: "border-orange-400/40 bg-orange-400/20" },
  { label: "Assistant", path: "/assistant", icon: <MessageCircle size={18} />, activeClass: "border-pink-400/40 bg-pink-400/20" },
  { label: "Blend", path: "/?section=blend", icon: <ArrowRightLeft size={18} />, activeClass: "border-emerald-400/40 bg-emerald-400/20" },
  { label: "Library", path: "/library", icon: <Library size={18} />, activeClass: "border-violet-400/40 bg-violet-400/20" },
];

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [topArtistSongs, setTopArtistSongs] = useState([]);
  const { library, playQueue } = usePlayer();

  useEffect(() => {
    let active = true;

    async function loadTopArtistSongs() {
      const artists = await getFeaturedArtists();
      const songs = artists
        .map((artist) => artist.tracks[0])
        .filter(Boolean)
        .slice(0, 4);

      if (active) {
        setTopArtistSongs(songs);
      }
    }

    loadTopArtistSongs().catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const linkClasses = (isActive, activeClass) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? `border ${activeClass} text-white`
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  function handleNavClick(path) {
    setOpen(false);
    navigate(path);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed left-3 top-3 z-50 rounded-lg border border-slate-800 bg-slate-900 p-3 text-white xl:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/70 xl:hidden"
        />
      ) : null}

      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-[min(290px,88vw)] px-3 py-4 transition-transform duration-300 sm:px-5 sm:py-6 xl:static xl:w-[290px] xl:translate-x-0 
          ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="glass-panel flex h-full flex-col overflow-hidden p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-800 p-3 text-orange-300">
              <Disc3 size={22} />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Muzify</p>
              <p className="text-sm text-slate-400">Simple music player</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) =>
              item.path.startsWith("/?") ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white ${
                    item.label === "Blend" ? "border border-emerald-400/20 bg-emerald-400/10" : ""
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => linkClasses(isActive, item.activeClass)}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="mt-8 min-h-0 flex-1 overflow-hidden">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Your Library
            </p>

            <div className="space-y-3 overflow-y-auto pr-1">
              <NavLink
                to="/library"
                onClick={() => setOpen(false)}
                className="block rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-400/20 text-orange-200">
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
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-200">
                      <Music2 size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{playlist.name}</p>
                      <p className="text-xs text-slate-400">{playlist.tracks.length} songs</p>
                    </div>
                  </NavLink>
                ))}
              </div>

              <div className="pt-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Top Artist Songs
                </p>

                <div className="space-y-2">
                  {topArtistSongs.map((song, index) => (
                    <button
                      key={`${song.id}-sidebar`}
                      type="button"
                      onClick={() => {
                        playQueue(topArtistSongs, index);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      <img
                        src={song.artwork}
                        alt={song.title}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{song.title}</p>
                        <p className="truncate text-xs text-slate-400">{song.artist}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

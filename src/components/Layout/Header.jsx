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

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      navigate("/search");
      return;// import { Outlet } from "react-router-dom";
      // import FooterPlayer from "./FooterPlayer";
      // import Header from "./Header";
      // import PageNavigation from "./PageNavigation";
      // import Sidebar from "./Sidebar";
      
      // function Layout() {
      //   return (
      //     <div className="flex min-h-screen w-full overflow-x-hidden bg-transparent text-slate-50">
      //       <Sidebar />
      
      //       <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      //         <Header />
      
      //         <main
      //           className="
      //             flex-1
      //             px-2
      //             pt-16
      //             pb-56
      //             sm:px-4
      //             sm:pt-20
      //             sm:pb-52
      //             md:px-6
      //             md:pb-40
      //             lg:px-8
      //             xl:pt-6
      //           "
      //         >
      //           <div className="mx-auto w-full max-w-7xl overflow-hidden">
      //             <PageNavigation />
      //             <Outlet />
      //           </div>
      //         </main>
      
      //         <FooterPlayer />
      //       </div>
      //     </div>
      //   );
      // }
      
      // export default Layout;
      
      import { useEffect, useRef } from "react";
      import { Pause, Play, SkipBack, SkipForward, Volume2, Waves } from "lucide-react";
      import { usePlayer } from "../../hooks/usePlayer";
      
      function formatTime(value) {
        if (!Number.isFinite(value) || value < 0) {
          return "0:00";
        }
      
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60)
          .toString()
          .padStart(2, "0");
      
        return `${minutes}:${seconds}`;
      }
      
      function FooterPlayer() {
        const audioRef = useRef(null);
        const {
          currentTrack,
          isPlaying,
          volume,
          currentTime,
          duration,
          setPlaying,
          setVolume,
          setPlaybackTime,
          setPlaybackDuration,
          playNext,
          playPrevious,
        } = usePlayer();
      
        useEffect(() => {
          const audio = audioRef.current;
          if (!audio || !currentTrack) {
            return;
          }
      
          const nextSource =
            currentTrack.audioUrl || currentTrack.previewUrl || currentTrack.streamUrl || "";
      
          if (audio.src !== nextSource) {
            audio.src = nextSource;
            audio.load();
          }
      
          if (isPlaying) {
            audio.play().catch(() => {
              setPlaying(false);
            });
          } else {
            audio.pause();
          }
        }, [currentTrack, isPlaying, setPlaying]);
      
        useEffect(() => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
          }
        }, [volume]);
      
        function handleSeek(event) {
          const nextValue = Number(event.target.value);
          if (audioRef.current) {
            audioRef.current.currentTime = nextValue;
          }
          setPlaybackTime(nextValue);
        }
      
        return (
          // <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-950 px-3 py-3 sm:px-4 sm:py-4 md:px-6 xl:left-[290px]">
           
           <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-950 px-3 py-3 sm:px-4 sm:py-4 md:px-6 xl:left-[290px] overflow-x-hidden">
            <audio
              ref={audioRef}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(event) => setPlaybackTime(event.currentTarget.currentTime)}
              onLoadedMetadata={(event) => setPlaybackDuration(event.currentTarget.duration)}
              onEnded={playNext}
            />
      
            {/* <div className="grid gap-3 sm:gap-4 md:grid-cols-[1.2fr_1.4fr_1fr] md:items-center"> */}
            <div className="grid gap-4 md:grid-cols-[1.2fr_1.4fr_1fr] md:items-center">
            
              <div className="flex min-w-0 items-center gap-4">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-900 sm:h-16 sm:w-16">
                  {currentTrack?.artwork ? (
                    <img
                      src={currentTrack.artwork}
                      alt={currentTrack.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <Waves size={22} />
                    </div>
                  )}
                </div>
      
                <div className="min-w-0">
                  <p className="truncate text-sm uppercase tracking-[0.24em] text-slate-500">
                    {currentTrack?.sourceLabel || "Muzify player"}
                  </p>
                  <p className="truncate text-sm font-semibold text-white sm:text-base">
                    {currentTrack?.title || "Pick a track or start a Blend Journey"}
                  </p>
                  <p className="truncate text-xs text-slate-400 sm:text-sm">
                    {currentTrack
                      ? `${currentTrack.artist} - ${currentTrack.album}`
                      : "Song previews and live radio"}
                  </p>
                </div>
              </div>
      
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <button type="button" onClick={playPrevious} className="action-button p-2.5 sm:p-3">
                    <SkipBack size={18} />
                  </button>
      
                  <button
                    type="button"
                    onClick={() => setPlaying(!isPlaying)}
                    disabled={!currentTrack}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>
      
                  <button type="button" onClick={playNext} className="action-button p-2.5 sm:p-3">
                    <SkipForward size={18} />
                  </button>
                </div>
      
                <div className="flex items-center gap-2 text-[11px] text-slate-400 sm:gap-3 sm:text-xs">
                  <span className="w-9 text-right sm:w-10">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 30}
                    step="0.1"
                    value={Math.min(currentTime, duration || 30)}
                    onChange={handleSeek}
                    className="h-1 w-full accent-orange-400"
                  />
                  <span className="w-9 sm:w-10">{formatTime(duration || 30)}</span>
                </div>
              </div>
      
              {/* <div className="flex items-center justify-start gap-3 md:justify-end"> */}
                <div className="flex w-full items-center justify-start gap-3 md:justify-end">
                
                <Volume2 size={18} className="shrink-0 text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  // className="h-1 w-full max-w-none accent-cyan-400 md:max-w-40"
      className="h-1 w-full accent-cyan-400 md:max-w-40"
                />
              </div>
            </div>
          </footer>
        );
      }
      
      export default FooterPlayer;
      
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
    // <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950 px-3 py-3 sm:px-4 sm:py-4 md:px-8">
      <header className="sticky top-0 z-30 w-full overflow-x-hidden border-b border-slate-800 bg-slate-950 px-3 py-3 sm:px-4 sm:py-4 md:px-8">
      
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center 2xl:justify-between">
          {/* <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 2xl:overflow-visible"> */}
           {/* <div className="flex flex-nowrap gap-2 overflow-x-auto">
           
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
          </div>   */}

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

        {/* <form
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
        </form> */}


<div className="w-full">
  {/* Mobile Search Icon */}
  <div className="flex justify-end sm:hidden">
    <button
      type="button"
      onClick={() => setShowMobileSearch((prev) => !prev)}
      className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-slate-200"
    >
      <Search size={18} />
    </button>
  </div>

  {/* Search Form */}
  <form
    onSubmit={handleSubmit}
    className={`
      mt-3 flex items-center gap-3 rounded-xl border border-slate-800
      bg-slate-900 px-3 py-3 text-slate-200 sm:mt-0 sm:flex
      ${showMobileSearch ? "flex" : "hidden sm:flex"}
    `}
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



      </div>
    </header>
  );
}

export default Header;

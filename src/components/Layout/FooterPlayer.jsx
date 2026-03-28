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
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/92 px-3 py-3 backdrop-blur-2xl sm:px-4 sm:py-4 md:px-6 xl:left-[290px]">
      <audio
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setPlaybackTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setPlaybackDuration(event.currentTarget.duration)}
        onEnded={playNext}
      />

      <div className="grid gap-3 sm:gap-4 md:grid-cols-[1.2fr_1.4fr_1fr] md:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:h-16 sm:w-16">
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-cyan-400 text-slate-950 shadow-lg shadow-orange-900/20 transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14"
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

        <div className="flex items-center justify-start gap-3 md:justify-end">
          <Volume2 size={18} className="shrink-0 text-slate-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="h-1 w-full max-w-none accent-cyan-400 md:max-w-40"
          />
        </div>
      </div>
    </footer>
  );
}

export default FooterPlayer;

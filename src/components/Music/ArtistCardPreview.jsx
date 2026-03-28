import { useEffect, useRef, useState } from "react";
import {
  Headphones,
  MapPin,
  PlayCircle,
  Radio,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";

function ArtistCardPreview({ artist }) {
  const navigate = useNavigate();
  const { playQueue } = usePlayer();
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function stopSong() {
    clearTimeout(timerRef.current);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function playSong() {
    if (!artist.tracks.length || !audioRef.current) {
      return;
    }

    clearTimeout(timerRef.current);

    const randomIndex = Math.floor(Math.random() * artist.tracks.length);
    const randomSong = artist.tracks[randomIndex];

    if (!randomSong?.previewUrl) {
      return;
    }

    audioRef.current.src = randomSong.previewUrl;
    audioRef.current.muted = muted;
    audioRef.current.play().catch(() => {});

    timerRef.current = setTimeout(() => {
      stopSong();
    }, 5500);
  }

  function toggleMute(event) {
    event.stopPropagation();
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      onClick={() => navigate(`/artist/${encodeURIComponent(artist.name)}`)}
      onMouseEnter={playSong}
      onMouseLeave={stopSong}
      className="group relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-900"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-cyan-400/10 opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex justify-between gap-4">
        <img
          src={artist.image}
          alt={artist.name}
          className="h-24 w-24 rounded-[24px] object-cover shadow-lg shadow-slate-950/50"
        />

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            if (artist.tracks.length) {
              playQueue(artist.tracks, 0);
            }
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-orange-500/15"
        >
          <PlayCircle size={20} />
        </button>
      </div>

      <div className="relative mt-5">
        <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
            <Headphones size={12} />
            {artist.trackCount} previews
          </span>

          {artist.country ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
              <MapPin size={12} />
              {artist.country}
            </span>
          ) : null}

          {artist.tagline ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
              <Radio size={12} />
              {artist.tagline}
            </span>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <audio ref={audioRef} />
    </div>
  );
}

export default ArtistCardPreview;

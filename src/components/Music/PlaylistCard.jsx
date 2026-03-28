import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";

function PlaylistCard({
  title,
  subtitle,
  tracks = [],
  to,
  actionLabel = "Play",
  onAction,
  footer,
}) {
  const navigate = useNavigate();
  const { playQueue } = usePlayer();
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function stopPreview() {
    clearTimeout(timerRef.current);

    if (!audioRef.current) {
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  function startPreview() {
    const playableTracks = tracks.filter(
      (track) => track?.audioUrl || track?.previewUrl || track?.streamUrl
    );

    if (!playableTracks.length || !audioRef.current) {
      return;
    }

    const randomTrack = playableTracks[Math.floor(Math.random() * playableTracks.length)];
    const source = randomTrack.audioUrl || randomTrack.previewUrl || randomTrack.streamUrl;

    if (!source) {
      return;
    }

    clearTimeout(timerRef.current);
    audioRef.current.src = source;
    audioRef.current.muted = muted;
    audioRef.current.play().catch(() => {});
    timerRef.current = setTimeout(stopPreview, 5500);
  }

  function handleOpen() {
    if (to) {
      navigate(to);
    }
  }

  function handleAction(event) {
    event.stopPropagation();

    if (onAction) {
      onAction();
      return;
    }

    playQueue(tracks, 0);
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
    <article
      onClick={handleOpen}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/30 hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
        <ArrowRight size={18} className="shrink-0 text-slate-500" />
      </div>

      {footer ? <p className="mt-4 text-sm text-slate-300">{footer}</p> : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={handleAction} className="action-button">
          <Play size={16} />
          {actionLabel}
        </button>

        <button type="button" onClick={toggleMute} className="action-button">
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          {muted ? "Unmute preview" : "Mute preview"}
        </button>
      </div>

      <audio ref={audioRef} />
    </article>
  );
}

export default PlaylistCard;

import { useEffect, useRef, useState } from "react";
import { Heart, ListPlus, Play, Volume2, VolumeX, Waves } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";

function TrackCard({
  track,
  compact = false,
  savePlaylistId = "quick-capture",
  saveLabel = "Save",
  onSave,
  queueTracks,
  queueIndex = 0,
}) {
  const { playTrack, playQueue, toggleLike, addTrackToPlaylist, isTrackLiked } = usePlayer();
  const liked = isTrackLiked(track.id);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function handleSave() {
    if (onSave) {
      onSave(track);
      return;
    }

    addTrackToPlaylist(savePlaylistId, track);
  }

  function handlePlay() {
    if (queueTracks?.length) {
      playQueue(queueTracks, queueIndex);
      return;
    }

    playTrack(track);
  }

  function stopPreview() {
    clearTimeout(timerRef.current);

    if (!audioRef.current) {
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  function startPreview() {
    const source = track.audioUrl || track.previewUrl || track.streamUrl;
    if (!source || !audioRef.current) {
      return;
    }

    clearTimeout(timerRef.current);
    audioRef.current.src = source;
    audioRef.current.muted = muted;
    audioRef.current.play().catch(() => {});
    timerRef.current = setTimeout(stopPreview, 6000);
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
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      className={`relative rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-600 hover:bg-slate-800 ${
        compact ? "flex items-center gap-4" : "space-y-4"
      }`}
    >
      <div
        className={
          compact ? "h-20 w-20 shrink-0 overflow-hidden rounded-xl" : "overflow-hidden rounded-2xl"
        }
      >
        {track.artwork ? (
          <img
            src={track.artwork}
            alt={track.title}
            className={`${compact ? "h-20 w-20" : "h-52 w-full"} object-cover`}
          />
        ) : (
          <div
            className={`${compact ? "h-20 w-20" : "h-52 w-full"} flex items-center justify-center bg-slate-950 text-slate-500`}
          >
            <Waves size={22} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">{track.title}</p>
            <p className="truncate text-sm text-slate-400">
              {track.artist} - {track.album}
            </p>
          </div>

          <span >
            {/* {track.sourceLabel} */}
          </span> 


        </div>

        {!compact ? (
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {track.genre} - {track.year || "Recent"} - {track.durationLabel}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={handlePlay} className="action-button">
            <Play size={16} />
            Play
          </button>
          <button type="button" onClick={() => toggleLike(track)} className="action-button">
            <Heart size={16} className={liked ? "fill-slate-100 text-slate-100" : ""} />
            {liked ? "Liked" : "Like"}
          </button>
          <button type="button" onClick={handleSave} className="action-button">
            <ListPlus size={16} />
            {saveLabel}
          </button>
          <button type="button" onClick={toggleMute} className="action-button">
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {muted ? "Unmute preview" : "Mute preview"}
          </button>
        </div>
      </div>

      <audio ref={audioRef} />
    </article>
  );
}

export default TrackCard;

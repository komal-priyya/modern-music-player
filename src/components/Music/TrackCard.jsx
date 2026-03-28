import { Heart, ListPlus, Play, Waves } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";

function TrackCard({
  track,
  compact = false,
  savePlaylistId = "quick-capture",
  saveLabel = "Save",
  onSave,
}) {
  const { playTrack, toggleLike, addTrackToPlaylist, isTrackLiked } = usePlayer();
  const liked = isTrackLiked(track.id);

  function handleSave() {
    if (onSave) {
      onSave(track);
      return;
    }

    addTrackToPlaylist(savePlaylistId, track);
  }

  return (
    <article
      className={`rounded-[28px] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-orange-400/30 hover:bg-white/10 ${
        compact ? "flex items-center gap-4" : "space-y-4"
      }`}
    >
      <div
        className={compact ? "h-20 w-20 shrink-0 overflow-hidden rounded-2xl" : "overflow-hidden rounded-3xl"}
      >
        {track.artwork ? (
          <img
            src={track.artwork}
            alt={track.title}
            className={`${compact ? "h-20 w-20" : "h-52 w-full"} object-cover`}
          />
        ) : (
          <div
            className={`${compact ? "h-20 w-20" : "h-52 w-full"} flex items-center justify-center bg-slate-900 text-slate-500`}
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
              {track.artist} • {track.album}
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-slate-950/70 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
            {track.sourceLabel}
          </span>
        </div>

        {!compact ? (
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {track.genre} • {track.year || "Recent"} • {track.durationLabel}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => playTrack(track)} className="action-button">
            <Play size={16} />
            Play
          </button>
          <button type="button" onClick={() => toggleLike(track)} className="action-button">
            <Heart size={16} className={liked ? "fill-orange-300 text-orange-300" : ""} />
            {liked ? "Liked" : "Like"}
          </button>
          <button type="button" onClick={handleSave} className="action-button">
            <ListPlus size={16} />
            {saveLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

export default TrackCard;

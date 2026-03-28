import { Play, Radio } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";

function StationCard({ station }) {
  const { playQueue } = usePlayer();

  return (
    <article className="rounded-[28px] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/10">
      <img
        src={station.artwork}
        alt={station.title}
        className="h-40 w-full rounded-3xl object-cover sm:h-48"
      />

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{station.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-400">
            {station.artist} • {station.genre}
          </p>
        </div>

        <span className="pill shrink-0">
          <Radio size={14} />
          Live
        </span>
      </div>

      <button type="button" onClick={() => playQueue([station], 0)} className="action-button mt-5">
        <Play size={16} />
        Play station
      </button>
    </article>
  );
}

export default StationCard;

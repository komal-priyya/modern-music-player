import { useEffect, useState } from "react";
import { Disc3, MapPin, Radio, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import TrackCard from "../components/Music/TrackCard";
import { usePlayer } from "../hooks/usePlayer";
import {
  getArtistContext,
  getArtistTopTracks,
  getRadioStations,
  searchTracks,
} from "../services/musicApi";

function ArtistPage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || "");
  const { playQueue, createPlaylist, addTracksToPlaylist } = usePlayer();
  const [artistContext, setArtistContext] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [radioStations, setRadioStations] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadArtistData() {
      if (!decodedName) {
        return;
      }

      const [nextContext, nextTracks, nextStations] = await Promise.all([
        getArtistContext(decodedName),
        getArtistTopTracks(decodedName),
        getRadioStations({ query: decodedName, limit: 4 }),
      ]);

      if (!active) {
        return;
      }

      setArtistContext(nextContext);
      setTopTracks(nextTracks);
      setRadioStations(nextStations);
    }

    loadArtistData().catch(() => {});

    return () => {
      active = false;
    };
  }, [decodedName]);

  async function handleSaveMix() {
    const tracks = topTracks.length ? topTracks : await searchTracks(decodedName);
    const playlistId = createPlaylist(`${decodedName} essentials`);
    addTracksToPlaylist(playlistId, tracks.slice(0, 8));
    toast.success("Artist mix saved to your library");
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel overflow-hidden">
        <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-[1.3fr_0.7fr] md:gap-8 md:p-8">
          <div>
            <p className="pill">
              <Sparkles size={14} />
              Artist deep dive
            </p>
            <h1 className="mt-4 break-words text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {decodedName}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              {artistContext?.summary ||
                "Preview top songs, spin live stations, and save an instant essentials playlist."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              {artistContext?.country ? (
                <span className="pill">
                  <MapPin size={14} />
                  {artistContext.country}
                </span>
              ) : null}

              {artistContext?.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="pill">
                  <Disc3 size={14} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => playQueue(topTracks, 0)} className="action-button">
                Play top tracks
              </button>
              <button type="button" onClick={handleSaveMix} className="action-button">
                Save essentials playlist
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-orange-500/20 via-slate-900 to-cyan-400/15 p-4 sm:p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Live radio options</p>
            <div className="mt-4 space-y-3">
              {radioStations.map((station) => (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => playQueue([station], 0)}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
                >
                  <div>
                    <p className="font-medium text-white">{station.title}</p>
                    <p className="text-sm text-slate-400">{station.genre}</p>
                  </div>
                  <Radio size={16} className="text-cyan-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-white">Top song previews</h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {topTracks.map((track) => (
            <TrackCard key={track.id} track={track} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtistPage;

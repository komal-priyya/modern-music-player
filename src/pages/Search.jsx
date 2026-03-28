import { useEffect, useState } from "react";
import { Radio, UserRound } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import StationCard from "../components/Music/StationCard";
import TrackCard from "../components/Music/TrackCard";
import { getRadioStations, searchArtists, searchTracks } from "../services/musicApi";

function Search() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadResults() {
      if (query.length <= 1) {
        setTracks([]);
        setArtists([]);
        setStations([]);
        return;
      }

      setLoading(true);

      try {
        const [nextTracks, nextArtists, nextStations] = await Promise.all([
          searchTracks(query),
          searchArtists(query),
          query.length > 2 ? getRadioStations({ query, limit: 6 }) : Promise.resolve([]),
        ]);

        if (!active) {
          return;
        }

        setTracks(nextTracks);
        setArtists(nextArtists);
        setStations(nextStations);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadResults().catch(() => {
      if (active) {
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [query]);

  if (!query) {
    return (
      <div className="glass-panel p-6 text-center text-slate-300 sm:p-8">
        Search from the header to see songs, artists, and radio results here.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel p-4 sm:p-6">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">Results for "{query}"</h1>
        {loading ? <p className="mt-3 text-sm text-slate-400">Loading results...</p> : null}
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-white">
          <UserRound size={18} />
          <h2 className="text-xl font-semibold">Artists</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artist/${encodeURIComponent(artist.name)}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-orange-400/30 hover:bg-white/10"
            >
              <img src={artist.image} alt={artist.name} className="h-40 w-full rounded-2xl object-cover" />
              <h3 className="mt-4 text-lg font-semibold text-white">{artist.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{artist.trackCount} previews</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-white">Songs</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-white">
          <Radio size={18} />
          <h2 className="text-xl font-semibold">Radio</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Search;

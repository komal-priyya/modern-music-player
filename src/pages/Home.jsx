import { useEffect, useState } from "react";
import { ArrowRight, Radio, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import JourneyBuilder from "../components/Music/JourneyBuilder";
import StationCard from "../components/Music/StationCard";
import TopArtists from "../components/Music/TopArtists";
import TrackCard from "../components/Music/TrackCard";
import { getHomeStations, getTrendingTracks } from "../services/musicApi";

function Home() {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadHomeData() {
      const [nextTrending, nextStations] = await Promise.all([
        getTrendingTracks(),
        getHomeStations(),
      ]);

      if (!active) {
        return;
      }

      setTrendingTracks(nextTrending);
      setStations(nextStations);
    }

    loadHomeData().catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <section className="glass-panel relative overflow-hidden p-4 sm:p-6 md:p-8">
        <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-36 w-36 rounded-full bg-pink-500/20 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <span className="pill">
              <Sparkles size={14} />
            </span>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link to="/search" className="action-button">
                Start searching
                <ArrowRight size={16} />
              </Link>
              <Link to="/library" className="action-button">
                Open library
              </Link>
            </div>
          </div>
        </div>
      </section>

      <JourneyBuilder />
      <TopArtists />

      <section className="glass-panel p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Quick picks</h2>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {trendingTracks.slice(0, 6).map((track) => (
            <TrackCard key={track.id} track={track} compact />
          ))}
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-white">
          <Radio size={18} />
          <h2 className="text-2xl font-semibold">Radio</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

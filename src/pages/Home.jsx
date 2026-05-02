import { useEffect, useRef, useState } from "react";
import { ArrowRight, Radio } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import JourneyBuilder from "../components/Music/JourneyBuilder";
import StationCard from "../components/Music/StationCard";
import TopArtists from "../components/Music/TopArtists";
import TrackCard from "../components/Music/TrackCard";
import { getFeaturedArtists, getHomeStations, getTrendingTracks } from "../services/musicApi";

function Home() {
  const [searchParams] = useSearchParams();
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [stations, setStations] = useState([]);
  const [topArtistSongs, setTopArtistSongs] = useState([]);
  const blendRef = useRef(null);

  useEffect(() => {
    let active = true;

    async function loadHomeData() {
      const [nextTrending, nextStations, artists] = await Promise.all([
        getTrendingTracks(),
        getHomeStations(),
        getFeaturedArtists(),
      ]);

      if (!active) {
        return;
      }

      setTrendingTracks(nextTrending);
      setStations(nextStations);
      setTopArtistSongs(
        artists
          .map((artist) => artist.tracks[0])
          .filter(Boolean)
          .slice(0, 6)
      );
    }

    loadHomeData().catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("section") === "blend") {
      blendRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <section className="glass-panel p-5 sm:p-6 md:p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Welcome to <span className="highlight-orange">Muzify</span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            Search songs, build playlists, explore artists, and play music in one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/search" className="action-button">
              Start searching
              <ArrowRight size={16} />
            </Link>
            <Link to="/library" className="action-button">
              Open library
            </Link>
          </div>
        </div>
      </section>

      <div ref={blendRef}>
        <JourneyBuilder />
      </div>

      <TopArtists />

      <section className="glass-panel p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-white">
          <span className="highlight-sky">Top artist</span> songs
        </h2>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {topArtistSongs.map((track, index) => (
            <TrackCard
              key={`${track.id}-artist-song`}
              track={track}
              compact
              queueTracks={topArtistSongs}
              queueIndex={index}
            />
          ))}
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-white">
          <span className="highlight-orange">Top</span> songs
        </h2>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {trendingTracks.slice(0, 6).map((track, index, list) => (
            <TrackCard
              key={track.id}
              track={track}
              compact
              queueTracks={list}
              queueIndex={index}
            />
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

import { Clock3, Heart, Radio } from "lucide-react";
import Playlist from "../components/Music/Playlist";
import RecommendedPlaylists from "../components/Music/RecommendedPlaylists";
import TrackCard from "../components/Music/TrackCard";
import { usePlayer } from "../hooks/usePlayer";

function Library() {
  const { library } = usePlayer();

  return (
    <div className="space-y-8">
      <section className="glass-panel p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Your listening room</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Likes, history, playlists, and Blend Journeys sync to Firebase when configured, and fall
          back to local storage when it is not.
        </p>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-white">
          <Heart size={18} />
          <h2 className="text-2xl font-semibold">Liked tracks</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {library.liked.length ? (
            library.liked.map((track) => <TrackCard key={track.id} track={track} compact />)
          ) : (
            <p className="text-slate-400">Like a few tracks to start building your library.</p>
          )}
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-white">
          <Clock3 size={18} />
          <h2 className="text-2xl font-semibold">Recently played</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {library.history.length ? (
            library.history.map((track) => <TrackCard key={`${track.id}-history`} track={track} compact />)
          ) : (
            <p className="text-slate-400">Play something from search or the home feed to see history here.</p>
          )}
        </div>
      </section>

      <Playlist />
      <RecommendedPlaylists />

      <section className="glass-panel p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-white">
          <Radio size={18} />
          <h2 className="text-2xl font-semibold">Saved Blend Journeys</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {library.journeys.length ? (
            library.journeys.map((journey) => (
              <article key={journey.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Journey</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{journey.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{journey.summary}</p>
                <p className="mt-4 text-sm text-slate-400">
                  {journey.tracks.length} tracks • saved {new Date(journey.createdAt).toLocaleDateString()}
                </p>
              </article>
            ))
          ) : (
            <p className="text-slate-400">Save a Blend Journey from the home page to keep it here.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Library;

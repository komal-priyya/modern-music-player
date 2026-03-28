import { useState } from "react";
import { Plus, ListMusic } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";
import PlaylistCard from "./PlaylistCard";

function Playlist() {
  const [playlistName, setPlaylistName] = useState("");
  const { library, createPlaylist } = usePlayer();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!playlistName.trim()) {
      return;
    }

    createPlaylist(playlistName);
    setPlaylistName("");
  };

  return (
    <section className="glass-panel p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="pill">
            <ListMusic size={14} />
            Playlist lab
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Build your own stacks</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Create playlists, then add tracks from search, artist pages, or saved journeys.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">
          <input
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
            placeholder="Name a playlist..."
            className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-slate-100 outline-none placeholder:text-slate-500"
          />
          <button type="submit" className="action-button whitespace-nowrap">
            <Plus size={16} />
            Create
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {library.playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            title={playlist.name}
            subtitle={`${playlist.tracks.length} tracks saved`}
            tracks={playlist.tracks}
            footer={`Updated ${new Date(playlist.updatedAt).toLocaleDateString()}`}
            actionLabel="Play"
          />
        ))}
      </div>
    </section>
  );
}

export default Playlist;

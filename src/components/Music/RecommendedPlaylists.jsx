import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";
import { usePlayer } from "../../hooks/usePlayer";
import { searchTracks } from "../../services/musicApi";
import { recommendedPlaylists } from "../../services/recommendedPlaylists";
import PlaylistCard from "./PlaylistCard";

function RecommendedPlaylists() {
  const { createPlaylist, addTracksToPlaylist } = usePlayer();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadPlaylists() {
      const nextPlaylists = await Promise.all(
        recommendedPlaylists.map(async (playlist) => {
          const tracks = await searchTracks(playlist.searchText, 8);
          return {
            ...playlist,
            tracks,
          };
        })
      );

      if (active) {
        setPlaylists(nextPlaylists);
      }
    }

    loadPlaylists().catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  function savePlaylist(playlist) {
    const playlistId = createPlaylist(playlist.name);
    addTracksToPlaylist(playlistId, playlist.tracks);
    toast.success("Playlist saved to your library");
  }

  return (
    <section className="glass-panel p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-2 text-white">
        <Sparkles size={18} />
        <h2 className="text-2xl font-semibold">Recommended playlists</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            title={playlist.name}
            subtitle={`${playlist.tracks.length} songs ready`}
            tracks={playlist.tracks}
            footer={playlist.description}
            actionLabel="Save playlist"
            onAction={() => savePlaylist(playlist)}
          />
        ))}
      </div>
    </section>
  );
}

export default RecommendedPlaylists;

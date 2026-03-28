import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Pencil, Save, Search, Trash2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TrackCard from "../components/Music/TrackCard";
import { usePlayer } from "../hooks/usePlayer";
import { searchTracks } from "../services/musicApi";

function PlaylistDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { library, playQueue, addTrackToPlaylist, renamePlaylist, deletePlaylist } = usePlayer();
  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const playlist = useMemo(() => {
    return library.playlists.find((entry) => entry.id === id);
  }, [id, library.playlists]);

  useEffect(() => {
    let active = true;

    async function loadTracks() {
      if (!submittedSearch) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);

      try {
        const nextResults = await searchTracks(submittedSearch, 8);
        if (active) {
          setSearchResults(nextResults);
        }
      } finally {
        if (active) {
          setIsSearching(false);
        }
      }
    }

    loadTracks().catch(() => {
      if (active) {
        setIsSearching(false);
      }
    });

    return () => {
      active = false;
    };
  }, [submittedSearch]);

  function handleSearch(event) {
    event.preventDefault();
    setSubmittedSearch(searchText.trim());
  }

  function handleSavePlaylist() {
    renamePlaylist(playlist.id, playlistName);
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setPlaylistName(playlist.name);
    setIsEditing(false);
  }

  function handleDeletePlaylist() {
    deletePlaylist(playlist.id);
    navigate("/library");
  }

  function handleStartEdit() {
    setPlaylistName(playlist.name);
    setIsEditing(true);
  }

  if (!playlist) {
    return (
      <div className="glass-panel p-8">
        <p className="text-white">Playlist not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel p-4 sm:p-6 md:p-8">
        <button type="button" onClick={() => navigate(-1)} className="action-button">
          <ArrowLeft size={16} />
          Back
        </button>

        {isEditing ? (
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              value={playlistName}
              onChange={(event) => setPlaylistName(event.target.value)}
              placeholder="Playlist name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-3xl font-semibold text-white outline-none placeholder:text-slate-500 sm:text-4xl"
            />

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={handleSavePlaylist} className="action-button">
                <Save size={16} />
                Save
              </button>
              <button type="button" onClick={handleCancelEdit} className="action-button">
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h1 className="mt-6 break-words text-3xl font-semibold text-white sm:text-4xl">
            {playlist.name}
          </h1>
        )}

        <p className="mt-3 max-w-2xl text-slate-300">{playlist.tracks.length} songs added</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => playQueue(playlist.tracks, 0)}
            className="action-button"
          >
            Play all
          </button>

          {!isEditing ? (
            <button type="button" onClick={handleStartEdit} className="action-button">
              <Pencil size={16} />
              Edit
            </button>
          ) : null}

          <button type="button" onClick={handleDeletePlaylist} className="action-button">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-white">Add songs</h2>

        <form onSubmit={handleSearch} className="mt-4 flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search a song or artist"
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>
          <button type="submit" className="action-button">
            Search
          </button>
        </form>

        {isSearching ? <p className="mt-4 text-slate-400">Searching...</p> : null}

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {searchResults.map((track) => (
            <TrackCard
              key={`${playlist.id}-${track.id}`}
              track={track}
              compact
              saveLabel="Add to playlist"
              onSave={() => addTrackToPlaylist(playlist.id, track)}
            />
          ))}
        </div>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <h2 className="text-2xl font-semibold text-white">Songs in this playlist</h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {playlist.tracks.length ? (
            playlist.tracks.map((track, index) => (
              <TrackCard key={`${track.id}-${index}`} track={track} compact />
            ))
          ) : (
            <p className="text-slate-400">This playlist is empty.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default PlaylistDetail;

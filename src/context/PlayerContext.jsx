import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  defaultLibraryState,
  loadPersistedLibrary,
  savePersistedLibrary,
} from "../lib/libraryStore";
import {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
  watchAuthUser,
} from "../lib/firebase";
import { PlayerContext } from "./playerContextObject";

function dedupeTracks(tracks) {
  const seen = new Set();
  return tracks.filter((track) => {
    if (!track?.id || seen.has(track.id)) {
      return false;
    }
    seen.add(track.id);
    return true;
  });
}

export function PlayerProvider({ children }) {
  const [library, setLibrary] = useState(defaultLibraryState);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const [currentTime, setPlaybackTime] = useState(0);
  const [duration, setPlaybackDuration] = useState(0);
  const [libraryReady, setLibraryReady] = useState(false);
  const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(false);
  const [user, setUser] = useState(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = watchAuthUser((nextUser) => {
      setUser(nextUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let active = true;

    loadPersistedLibrary().then(({ state, cloudSync }) => {
      if (!active) {
        return;
      }

      setLibrary(state);
      setIsCloudSyncEnabled(cloudSync);
      setLibraryReady(true);
      hasLoadedRef.current = true;
    });

    return () => {
      active = false;
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      return;
    }

    savePersistedLibrary(library).then((cloudSync) => {
      setIsCloudSyncEnabled(cloudSync);
    });
  }, [library]);

  const currentTrack = queue[currentIndex] || null;
  const isLoggedIn = Boolean(user && !user.isAnonymous);

  const rememberTrack = (track) => {
    if (!track) {
      return;
    }

    setLibrary((previous) => ({
      ...previous,
      history: dedupeTracks([track, ...previous.history]).slice(0, 18),
    }));
  };

  const playQueue = (tracks, startIndex = 0) => {
    if (!tracks?.length) {
      toast.error("No playable tracks available");
      return;
    }

    const nextQueue = dedupeTracks(tracks);
    const boundedIndex = Math.min(startIndex, nextQueue.length - 1);
    setQueue(nextQueue);
    setCurrentIndex(boundedIndex);
    setPlaybackTime(0);
    setPlaybackDuration(0);
    setPlaying(true);
    rememberTrack(nextQueue[boundedIndex]);
  };

  const playTrack = (track) => {
    playQueue([track], 0);
  };

  const playNext = () => {
    if (!queue.length) {
      return;
    }

    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setPlaybackTime(0);
      setPlaybackDuration(0);
      setPlaying(true);
      rememberTrack(queue[nextIndex]);
      return;
    }

    setPlaying(false);
  };

  const playPrevious = () => {
    if (!queue.length || currentIndex === 0) {
      setPlaybackTime(0);
      return;
    }

    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    setPlaybackTime(0);
    setPlaybackDuration(0);
    setPlaying(true);
    rememberTrack(queue[nextIndex]);
  };

  const isTrackLiked = (trackId) => library.liked.some((track) => track.id === trackId);

  const toggleLike = (track) => {
    setLibrary((previous) => {
      const alreadyLiked = previous.liked.some((entry) => entry.id === track.id);
      return {
        ...previous,
        liked: alreadyLiked
          ? previous.liked.filter((entry) => entry.id !== track.id)
          : dedupeTracks([track, ...previous.liked]),
      };
    });
  };

  const createPlaylist = (name) => {
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    const playlist = {
      id,
      name,
      tracks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setLibrary((previous) => ({
      ...previous,
      playlists: [...previous.playlists, playlist],
    }));

    toast.success("Playlist created");
    return id;
  };

  const addTracksToPlaylist = (playlistId, tracks) => {
    setLibrary((previous) => ({
      ...previous,
      playlists: previous.playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: dedupeTracks([...playlist.tracks, ...tracks]),
              updatedAt: new Date().toISOString(),
            }
          : playlist
      ),
    }));
  };

  const addTrackToPlaylist = (playlistId, track) => {
    const existingPlaylist = library.playlists.find((playlist) => playlist.id === playlistId);
    if (!existingPlaylist) {
      const nextId = createPlaylist("Quick Capture");
      addTracksToPlaylist(nextId, [track]);
      toast.success("Saved to a new playlist");
      return;
    }

    addTracksToPlaylist(playlistId, [track]);
    toast.success("Track added to playlist");
  };

  const renamePlaylist = (playlistId, name) => {
    const nextName = name.trim();
    if (!nextName) {
      toast.error("Playlist name cannot be empty");
      return;
    }

    setLibrary((previous) => ({
      ...previous,
      playlists: previous.playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              name: nextName,
              updatedAt: new Date().toISOString(),
            }
          : playlist
      ),
    }));

    toast.success("Playlist updated");
  };

  const deletePlaylist = (playlistId) => {
    setLibrary((previous) => ({
      ...previous,
      playlists: previous.playlists.filter((playlist) => playlist.id !== playlistId),
    }));

    toast.success("Playlist deleted");
  };

  const saveJourney = (journey) => {
    setLibrary((previous) => ({
      ...previous,
      journeys: [
        {
          ...journey,
          id: journey.id || `journey-${Date.now()}`,
          createdAt: journey.createdAt || new Date().toISOString(),
        },
        ...previous.journeys,
      ].slice(0, 12),
    }));
    toast.success("Blend Journey saved");
  };

  async function login() {
    try {
      await loginWithGoogle();
      toast.success("Signed in");
    } catch (error) {
      toast.error(error.message || "Unable to sign in");
    }
  }

  async function loginWithEmailPassword(email, password) {
    try {
      await loginWithEmail(email, password);
      toast.success("Signed in");
    } catch (error) {
      toast.error(error.message || "Unable to sign in");
    }
  }

  async function register(name, email, password) {
    try {
      await registerWithEmail(name, email, password);
      toast.success("Account created");
    } catch (error) {
      toast.error(error.message || "Unable to create account");
    }
  }

  async function logout() {
    try {
      await logoutUser();
      toast.success("Logged out");
    } catch {
      toast.error("Unable to log out");
    }
  }

  const value = {
    currentTrack,
    queue,
    currentIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    library,
    libraryReady,
    isCloudSyncEnabled,
    user,
    isLoggedIn,
    login,
    loginWithEmailPassword,
    register,
    logout,
    playQueue,
    playTrack,
    playNext,
    playPrevious,
    setPlaying,
    setVolume,
    setPlaybackTime,
    setPlaybackDuration,
    toggleLike,
    isTrackLiked,
    createPlaylist,
    addTrackToPlaylist,
    addTracksToPlaylist,
    renamePlaylist,
    deletePlaylist,
    saveJourney,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

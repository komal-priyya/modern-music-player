import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaPlay } from 'react-icons/fa';

const Playlist = () => {
  const { user } = useAuth();
  const [playlistName, setPlaylistName] = useState('');
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const createPlaylist = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to create playlists');
      return;
    }

    try {
      const playlistData = {
        name: playlistName,
        userId: user.uid,
        tracks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'playlists'), playlistData);
      toast.success('Playlist created successfully!');
      setPlaylistName('');
      loadUserPlaylists();
    } catch (error) {
      toast.error('Error creating playlist');
    }
  };

  const loadUserPlaylists = async () => {
    if (!user) return;

    const q = query(collection(db, 'playlists'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const playlists = [];
    querySnapshot.forEach((doc) => {
      playlists.push({ id: doc.id, ...doc.data() });
    });
    setUserPlaylists(playlists);
  };

  const addTrackToPlaylist = async (playlistId, track) => {
    try {
      const playlistRef = doc(db, 'playlists', playlistId);
      const playlist = userPlaylists.find(p => p.id === playlistId);
      
      if (playlist.tracks.some(t => t.id === track.id)) {
        toast.error('Track already in playlist');
        return;
      }

      const updatedTracks = [...playlist.tracks, track];
      await updateDoc(playlistRef, { 
        tracks: updatedTracks,
        updatedAt: new Date().toISOString()
      });
      
      toast.success('Added to playlist!');
      loadUserPlaylists();
    } catch (error) {
      toast.error('Error adding to playlist');
    }
  };

  const removeFromPlaylist = async (playlistId, trackId) => {
    try {
      const playlistRef = doc(db, 'playlists', playlistId);
      const playlist = userPlaylists.find(p => p.id === playlistId);
      
      const updatedTracks = playlist.tracks.filter(t => t.id !== trackId);
      await updateDoc(playlistRef, { 
        tracks: updatedTracks,
        updatedAt: new Date().toISOString()
      });
      
      toast.success('Removed from playlist');
      loadUserPlaylists();
    } catch (error) {
      toast.error('Error removing from playlist');
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">My Playlists</h2>
      
      {/* Create Playlist Form */}
      <form onSubmit={createPlaylist} className="mb-8">
        <div className="flex space-x-2">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="New playlist name..."
            className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Create</span>
          </button>
        </div>
      </form>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userPlaylists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer"
            onClick={() => setSelectedPlaylist(playlist)}
          >
            <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
            <p className="text-gray-400 text-sm">
              {playlist.tracks.length} tracks
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Created: {new Date(playlist.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Playlist Details */}
      {selectedPlaylist && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">{selectedPlaylist.name}</h3>
          <div className="space-y-2">
            {selectedPlaylist.tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img src={track.image} alt={track.name} className="w-10 h-10 rounded" />
                  <div>
                    <p className="font-medium">{track.name}</p>
                    <p className="text-sm text-gray-400">{track.artist_name}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromPlaylist(selectedPlaylist.id, track.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
// components/AddToPlaylistModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEdit, FaPlus } from 'react-icons/fa';

export default function AddToPlaylistModal({ track, onClose }) {
  // State for existing playlists and UI feedback
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  // Fetch playlists from the backend when modal opens
  useEffect(() => {
    async function fetchPlaylists() {
        try {
          const res = await fetch('/api/playlist'); // New URL (if your file is at pages/api/playlist/index.js)
          const data = await res.json();
          setPlaylists(data);
        } catch (err) {
          console.error('Error fetching playlists:', err);
        } finally {
          setLoading(false);
        }
      }
      
    fetchPlaylists();
  }, []);

  // Handler for adding track to a specific playlist
  const handleAddTrack = async (playlistId) => {
    // Find the selected playlist locally
    const selectedPlaylist = playlists.find((p) => p._id === playlistId);
    if (selectedPlaylist.tracks.some((t) => t._id === track._id)) {
      setErrorMsg('This track is already in the playlist.');
      return;
    }
    try {
      const res = await fetch(`/api/playlist/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track }),
      });
      const data = await res.json();
      if (res.ok) {
        onClose(); // Close the modal on success
      } else {
        setErrorMsg(data.error || 'Failed to add track.');
      }
    } catch (error) {
      console.error('Error adding track:', error);
      setErrorMsg('An error occurred while adding track.');
    }
  };

  // Handler to create a new playlist and add the track
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    try {
      const res = await fetch('/api/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPlaylistName, tracks: [track] }),
      });
      const data = await res.json();
      if (res.ok) {
        // Optionally, update local state with new playlist.
        onClose();
      } else {
        setErrorMsg(data.error || 'Failed to create playlist.');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      setErrorMsg('An error occurred while creating playlist.');
    }
  };

  // Handler to rename a playlist
  const handleRenamePlaylist = async (playlistId) => {
    if (!renameValue.trim()) return;
    try {
      const res = await fetch(`/api/playlist/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: renameValue }),
      });
      const data = await res.json();
      if (res.ok) {
        // Update the local state playlist name
        setPlaylists((prev) =>
          prev.map((p) =>
            p._id === playlistId ? { ...p, name: renameValue } : p
          )
        );
        setRenamingId(null);
        setRenameValue('');
      } else {
        setErrorMsg(data.error || 'Failed to rename playlist.');
      }
    } catch (error) {
      console.error('Error renaming playlist:', error);
      setErrorMsg('An error occurred while renaming playlist.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Add to Playlist</h2>
            <button onClick={onClose} className="text-white">
              <FaTimes size={20} />
            </button>
          </div>
          {errorMsg && (
            <p className="text-red-400 text-sm mb-2">{errorMsg}</p>
          )}
          <div className="mb-4">
            <p className="text-gray-300 mb-2">Select an existing playlist:</p>
            {loading ? (
              <p className="text-gray-400">Loading playlists...</p>
            ) : playlists.length > 0 ? (
              <ul className="space-y-3">
                {playlists.map((p) => (
                  <li
                    key={p._id}
                    className="bg-gray-700 p-3 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      {renamingId === p._id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            className="bg-gray-600 p-1 rounded text-white"
                          />
                          <button
                            onClick={() => handleRenamePlaylist(p._id)}
                            className="text-green-400 font-semibold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <p className="text-white font-medium">{p.name}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          renamingId === p._id
                            ? setRenamingId(null)
                            : (setRenamingId(p._id), setRenameValue(p.name))
                        }
                        className="text-gray-300 hover:text-white transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleAddTrack(p._id)}
                        className="bg-green-500 text-black px-3 py-1 rounded font-semibold hover:bg-green-600 transition"
                      >
                        Add
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No playlists found.</p>
            )}
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-300 mb-2">Or create a new playlist:</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="flex-1 bg-gray-600 p-2 rounded text-white"
              />
              <button
                onClick={handleCreatePlaylist}
                className="bg-blue-500 text-black px-4 py-2 rounded font-semibold hover:bg-blue-600 transition flex items-center gap-1"
              >
                <FaPlus />
                <span>Create</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

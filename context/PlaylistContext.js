// context/PlaylistContext.js
import React, { createContext, useContext, useState } from 'react';

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);

  const addTrackToPlaylist = (track) => {
    // Prevent duplicate entries if desired
    setPlaylist((prev) => {
      if (prev.find((t) => t._id === track._id)) return prev;
      return [...prev, track];
    });
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addTrackToPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}

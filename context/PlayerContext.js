// context/PlayerContext.js
import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [trackList, setTrackList] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Function to play a selected track (and set the global track list)
  const playTrack = (track, tracks) => {
    setTrackList(tracks);
    const index = tracks.findIndex((t) => t._id === track._id);
    setCurrentTrackIndex(index >= 0 ? index : 0);
    setPlaying(true);
  };

  // Function to go to the next track
  const nextTrack = () => {
    if (trackList.length > 0) {
      setCurrentTrackIndex((prev) => (prev + 1) % trackList.length);
      setPlaying(true);
    }
  };

  // Function to go to the previous track
  const prevTrack = () => {
    if (trackList.length > 0) {
      setCurrentTrackIndex(
        (prev) => (prev - 1 + trackList.length) % trackList.length
      );
      setPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        trackList,
        setTrackList,
        currentTrackIndex,
        setCurrentTrackIndex,
        playing,
        setPlaying,
        playTrack,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

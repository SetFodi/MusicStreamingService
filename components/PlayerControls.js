import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';

export default function PlayerControls() {
  // Get global player state and functions from context
  const {
    trackList,
    currentTrackIndex,
    playing,
    setPlaying,
    nextTrack,
    prevTrack,
  } = usePlayer();

  // Local state for volume, progress, and duration
  const [volume, setVolume] = useState(1); // value between 0 and 1
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Determine the current track
  const currentTrack = trackList[currentTrackIndex] || null;

  // Update progress every second when playing
  useEffect(() => {
    if (playing) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current) {
          setProgress(playerRef.current.seek());
        }
      }, 1000);
    } else {
      clearInterval(progressIntervalRef.current);
    }
    return () => clearInterval(progressIntervalRef.current);
  }, [playing]);

  // Update Howler volume when `volume` state changes.
  useEffect(() => {
    if (playerRef.current && playerRef.current.howler) {
      playerRef.current.howler.volume(volume);
    }
    console.log("Volume updated:", volume);
  }, [volume]);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seek(newTime);
      setProgress(newTime);
    }
  };

  const onEnd = () => {
    nextTrack();
  };

  // If no track is selected, don't render the player.
  if (!currentTrack) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full bg-white/10 backdrop-blur-md bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex flex-col shadow-2xl z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Track Info & Playback Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg shadow-md"
          />
          <div>
            <p className="text-white font-bold text-lg">
              {currentTrack.title}
            </p>
            <p className="text-gray-300 text-sm">
              {currentTrack.artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <FaStepBackward
            onClick={prevTrack}
            className="text-gray-300 text-2xl cursor-pointer hover:text-white transition"
          />
          <button
            onClick={() => setPlaying(!playing)}
            className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full text-black hover:scale-110 transition transform"
          >
            {playing ? (
              <FaPause className="text-2xl" />
            ) : (
              <FaPlay className="text-2xl" />
            )}
          </button>
          <FaStepForward
            onClick={nextTrack}
            className="text-gray-300 text-2xl cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mt-4">
        <span className="text-gray-300 text-sm mr-2">{formatTime(progress)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="flex-1 h-2 rounded-full bg-gray-600 accent-blue-500 cursor-pointer"
        />
        <span className="text-gray-300 text-sm ml-2">{formatTime(duration)}</span>
      </div>

      {/* Volume Control */}
      <div className="flex items-center mt-2">
        <FaVolumeUp className="text-gray-300 mr-2" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
          }}
          className="w-28 h-2 rounded-full bg-gray-600 accent-blue-500 cursor-pointer"
        />
      </div>

      <ReactHowler
        src={currentTrack.filePath}
        playing={playing}
        volume={volume}
        ref={playerRef}
        onLoad={() => {
          if (playerRef.current) {
            setDuration(playerRef.current.duration());
          }
        }}
        onEnd={onEnd}
      />
    </motion.div>
  );
}

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '00:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

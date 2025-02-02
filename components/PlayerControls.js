// components/PlayerControls.js
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

export default function PlayerControls({ trackList }) {
  // Default track list if none provided via props:
  const defaultTracks = [
    {
      title: "Baby I'm Back",
      artist: 'The Kid LAROI',
      filePath: '/music/sample1.mp3',
      albumArt: '/images/babyimback.jpg',
    },
    {
      title: 'Sucker',
      artist: 'Jonas Brothers',
      filePath: '/music/sample2.mp3',
      albumArt: '/images/sucker.png',
    },
    {
      title: 'Lose Yourself',
      artist: 'Eminem',
      filePath: '/music/sample3.mp3',
      albumArt: '/images/loseyourself.jpg',
    },
    {
      title: 'You and I',
      artist: 'One Direction',
      filePath: '/music/sample4.mp3',
      albumArt: '/images/youandi.png',
    },
    {
      title: 'Cake by the Ocean',
      artist: 'DNCE',
      filePath: '/music/sample5.mp3',
      albumArt: '/images/cakebytheocean.jpg',
    },
    {
      title: 'Strangers',
      artist: 'Kenya Grace',
      filePath: '/music/sample6.mp3',
      albumArt: '/images/strangers.png',
    },
  ];

  const tracks = trackList && trackList.length > 0 ? trackList : defaultTracks;

  // Player states
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

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

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seek(newTime);
      setProgress(newTime);
    }
  };

  const handlePrev = () => {
    setProgress(0);
    setPlaying(false);
    setCurrentTrackIndex((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setProgress(0);
    setPlaying(false);
    setCurrentTrackIndex((prev) =>
      prev === tracks.length - 1 ? 0 : prev + 1
    );
  };

  const onEnd = () => {
    handleNext();
    setPlaying(true);
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full bg-white/10 backdrop-blur-md bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex flex-col shadow-2xl z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Track Info & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg shadow-md"
          />
          <div>
            <p className="text-white font-bold text-lg">{currentTrack.title}</p>
            <p className="text-gray-300 text-sm">{currentTrack.artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <FaStepBackward
            onClick={handlePrev}
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
            onClick={handleNext}
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
          onChange={(e) => setVolume(parseFloat(e.target.value))}
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

// Helper to format seconds to mm:ss
function formatTime(secs) {
  if (!secs || isNaN(secs)) return '00:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function PlayerControls({ trackList }) {
  // If no track list is provided via props, use a default list:
  const defaultTracks = [
    {
      title: "Baby I'm Back",
      artist: 'The Kid LAROI',
      filePath: '/music/sample1.mp3',
      albumArt: '/images/babyImBack.png',
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
      albumArt: '/images/loseYourself.png',
    },
    {
      title: 'You and I',
      artist: 'One Direction',
      filePath: '/music/sample4.mp3',
      albumArt: '/images/youAndI.png',
    },
    {
      title: 'Cake by the Ocean',
      artist: 'DNCE',
      filePath: '/music/sample5.mp3',
      albumArt: '/images/cakeByTheOcean.png',
    },
  ];

  const tracks = trackList && trackList.length > 0 ? trackList : defaultTracks;

  // State for playback, volume, progress, and current track index
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // 0 to 1
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Get the current track from the list
  const currentTrack = tracks[currentTrackIndex];

  // Update the progress every second while playing
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

  // Function to handle seeking via the progress bar
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seek(newTime);
      setProgress(newTime);
    }
  };

  // Function to switch to the previous track
  const handlePrev = () => {
    setProgress(0);
    setPlaying(false);
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  // Function to switch to the next track
  const handleNext = () => {
    setProgress(0);
    setPlaying(false);
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  // When a track ends, automatically play the next one
  const onEnd = () => {
    handleNext();
    // Optionally, set playing to true to auto-start the next track:
    setPlaying(true);
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-700 bg-opacity-90 backdrop-blur-md p-4 flex flex-col shadow-2xl z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Track Info & Playback Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-md shadow-md"
          />
          <div>
            <p className="text-white font-bold">{currentTrack.title}</p>
            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <FaStepBackward
            onClick={handlePrev}
            className="text-gray-300 text-xl cursor-pointer hover:text-white transition-colors duration-200"
          />
          <button
            onClick={() => setPlaying(!playing)}
            className="bg-primary p-3 rounded-full text-black hover:bg-green-600 transition transform hover:scale-110"
          >
            {playing ? (
              <FaPause className="text-xl" />
            ) : (
              <FaPlay className="text-xl" />
            )}
          </button>
          <FaStepForward
            onClick={handleNext}
            className="text-gray-300 text-xl cursor-pointer hover:text-white transition-colors duration-200"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center mt-4">
        <span className="text-gray-300 text-xs mr-2">{formatTime(progress)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="flex-1 h-2 rounded-lg bg-gray-600 accent-green-500 cursor-pointer"
        />
        <span className="text-gray-300 text-xs ml-2">{formatTime(duration)}</span>
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
          className="w-32 h-2 rounded-lg bg-gray-600 accent-green-500 cursor-pointer"
        />
      </div>

      {/* ReactHowler Component for Audio Playback */}
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

// Helper function to format seconds into mm:ss
function formatTime(secs) {
  if (!secs || isNaN(secs)) return '00:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;
}

// pages/library.js
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaPlus, FaPlay } from 'react-icons/fa';
import AddToPlaylistModal from '../components/AddToPlaylistModal';
import { usePlayer } from '../context/PlayerContext';

export default function Library() {
  const [tracks, setTracks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const { playTrack } = usePlayer();

  useEffect(() => {
    fetch('/api/tracks')
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error(err));
  }, []);

  const openModal = (track) => {
    setSelectedTrack(track);
    setModalOpen(true);
  };

  return (
    <Layout>
      <div className="p-10">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-center"
        >
          🎵 All Tracks
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tracks.map((track) => (
            <motion.div
              key={track._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col"
            >
              <img
                src={track.albumArt || '/images/albumArtPlaceholder.png'}
                alt={track.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  {track.title}
                </h3>
                <p className="text-gray-300 text-sm">{track.artist}</p>
              </div>
              <div className="flex justify-between mt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-black px-4 py-2 rounded-full font-semibold transition-all"
                  onClick={() => openModal(track)}
                >
                  <FaPlus />
                  <span>Add</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-orange-400 text-black px-4 py-2 rounded-full font-semibold transition-all"
                  onClick={() => playTrack(track, tracks)}
                >
                  <FaPlay />
                  <span>Play</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {modalOpen && selectedTrack && (
        <AddToPlaylistModal
          track={selectedTrack}
          onClose={() => {
            setModalOpen(false);
            setSelectedTrack(null);
          }}
        />
      )}
    </Layout>
  );
}

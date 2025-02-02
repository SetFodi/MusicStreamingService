// pages/library.js
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

export default function Library() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch('/api/tracks')
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error(err));
  }, []);

  const addTrackToPersistentPlaylist = async (track) => {
    try {
      const response = await fetch(`/api/playlist/default`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`Added ${track.title} to playlist`, data);
      } else {
        console.error('Error adding track:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
                <h3 className="text-xl font-bold text-white">{track.title}</h3>
                <p className="text-gray-300 text-sm">{track.artist}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-black px-4 py-2 rounded-full font-semibold transition-all"
                onClick={() => addTrackToPersistentPlaylist(track)}
              >
                <FaPlus />
                <span>Add</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

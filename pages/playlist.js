// pages/playlist.js
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Playlist() {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    fetch('/api/playlist/default')
      .then((res) => res.json())
      .then((data) => setPlaylist(data))
      .catch((err) => console.error(err));
  }, []);

  if (!playlist) {
    return (
      <Layout>
        <div className="p-10 text-center text-gray-300 text-xl">Loading playlist...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-10">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-center"
        >
          🎶 My Playlist
        </motion.h2>
        {playlist.tracks && playlist.tracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {playlist.tracks.map((track) => (
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
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center text-lg">
            No tracks in your playlist yet.
          </p>
        )}
      </div>
    </Layout>
  );
}

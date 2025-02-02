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

  return (
    <Layout>
      <div className="p-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-white mb-8"
        >
          🎵 All Tracks
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tracks.map((track) => (
            <motion.div
              key={track._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-xl shadow-xl hover:shadow-2xl flex flex-col"
            >
              <img
                src={track.albumArt || '/images/albumArtPlaceholder.png'}
                alt={track.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{track.title}</h3>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 inline-flex items-center space-x-2 bg-primary text-black px-3 py-1 rounded-full font-semibold transition-colors hover:bg-green-600"
                onClick={() => {
                  // TODO: Implement add-to-playlist functionality.
                  console.log(`Add ${track.title} to playlist`);
                }}
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

// pages/playlist/[id].js
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function PlaylistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/playlist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaylist(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching playlist:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-white">Loading playlist...</div>
      </Layout>
    );
  }

  if (!playlist) {
    return (
      <Layout>
        <div className="p-10 text-center text-white">Playlist not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          {playlist.name}
        </motion.h2>
        {playlist.tracks && playlist.tracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {playlist.tracks.map((track) => (
              <motion.div
                key={track._id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col"
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
            No tracks in this playlist yet.
          </p>
        )}
      </div>
    </Layout>
  );
}

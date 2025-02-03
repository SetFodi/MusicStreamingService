// pages/playlist/index.js
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/playlists')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched playlists:', data);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setPlaylists(data);
        } else {
          console.error('Expected an array but got:', data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching playlists:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-white">Loading playlists...</div>
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
          className="text-4xl font-bold text-white mb-10 text-center"
        >
          Your Playlists
        </motion.h2>
        {Array.isArray(playlists) && playlists.length === 0 ? (
          <p className="text-gray-300 text-center">No playlists created yet.</p>
        ) : (
          Array.isArray(playlists) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {playlists.map((playlist) => (
                <Link
  key={playlist._id}
  href={`/playlist/${playlist._id}`}
  className="block bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition"
>
  <h3 className="text-2xl font-bold text-white mb-2">
    {playlist.name}
  </h3>
  <p className="text-gray-300">
    Tracks: {playlist.tracks ? playlist.tracks.length : 0}
  </p>
</Link>

              ))}
            </div>
          )
        )}
      </div>
    </Layout>
  );
}

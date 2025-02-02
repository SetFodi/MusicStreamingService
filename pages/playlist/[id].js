import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function PlaylistPage() {
  const router = useRouter();
  const { id } = router.query;
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/playlist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setPlaylist(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!playlist) {
    return (
      <Layout>
        <div className="p-8">Loading playlist...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">{playlist.name}</h2>
        <ul>
          {playlist.tracks.map((track) => (
            <li key={track._id} className="mb-2">
              {track.title} - {track.artist}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

// pages/api/playlists/index.js
import dbConnect from '../../../lib/dbConnect';
import Playlist from '../../../models/Playlist';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const playlists = await Playlist.find({}).populate('tracks');
      return res.status(200).json(playlists);
    } catch (err) {
      console.error('Error fetching playlists:', err);
      return res.status(500).json({ error: 'Failed to fetch playlists' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, tracks } = req.body;
      const newPlaylist = await Playlist.create({ name, tracks });
      return res.status(201).json(newPlaylist);
    } catch (err) {
      console.error('Error creating playlist:', err);
      return res.status(400).json({ error: 'Failed to create playlist' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

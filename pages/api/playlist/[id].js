// pages/api/playlist/[id].js
import dbConnect from '../../../lib/dbConnect';
import Playlist from '../../../models/Playlist';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      let playlist;
      if (id === 'default') {
        // Use customId instead of _id
        playlist = await Playlist.findOne({ customId: 'default' }).populate('tracks');
      } else {
        playlist = await Playlist.findById(id).populate('tracks');
      }
      if (!playlist) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(playlist);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch playlist' });
    }
  } else if (req.method === 'PUT') {
    try {
      let playlist;
      if (id === 'default') {
        playlist = await Playlist.findOne({ customId: 'default' }).populate('tracks');
      } else {
        playlist = await Playlist.findById(id).populate('tracks');
      }
      // If the playlist doesn't exist, create it.
      if (!playlist) {
        if (id === 'default') {
          playlist = new Playlist({ customId: 'default', name: 'My Playlist', tracks: [] });
        } else {
          playlist = new Playlist({ _id: id, name: 'My Playlist', tracks: [] });
        }
      }
      const { track, name, tracks: newTracks } = req.body;
      if (track) {
        // Add the track if it doesn't already exist.
        const exists = playlist.tracks.some(
          (t) => t._id.toString() === track._id.toString()
        );
        if (!exists) {
          playlist.tracks.push(track);
        }
      } else {
        if (name) playlist.name = name;
        if (newTracks) playlist.tracks = newTracks;
      }
      const updated = await playlist.save();
      // Populate tracks before sending back the response.
      await updated.populate('tracks');
      return res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: 'Failed to update playlist' });
    }
  } else if (req.method === 'DELETE') {
    try {
      if (id === 'default') {
        await Playlist.deleteOne({ customId: 'default' });
      } else {
        await Playlist.findByIdAndDelete(id);
      }
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete playlist' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

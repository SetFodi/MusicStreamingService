import dbConnect from '../../../lib/dbConnect';
import Playlist from '../../../models/Playlist';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const playlist = await Playlist.findById(id).populate('tracks');
      if (!playlist) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch playlist' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, tracks } = req.body;
      const updated = await Playlist.findByIdAndUpdate(
        id,
        { name, tracks },
        { new: true }
      ).populate('tracks');
      if (!updated) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to update playlist' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Playlist.findByIdAndDelete(id);
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete playlist' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

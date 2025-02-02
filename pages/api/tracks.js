import dbConnect from '../../lib/dbConnect';
import Track from '../../models/Track';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const tracks = await Track.find({});
      return res.status(200).json(tracks);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch tracks' });
    }
  } else if (req.method === 'POST') {
    try {
      const newTrack = await Track.create(req.body);
      return res.status(201).json(newTrack);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to create track' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

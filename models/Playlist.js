import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
}, { timestamps: true });

export default mongoose.models.Playlist ||
  mongoose.model('Playlist', PlaylistSchema);

// models/Playlist.js
import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  // Optionally, you can still use the default _id field,
  // but add a customId field for persistent playlists.
  customId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  tracks: [
    {
      // Either embed track information or reference the Track model.
      // If you reference, ensure you have proper population.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
    },
  ],
});

export default mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);

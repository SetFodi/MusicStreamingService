import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  album: { type: String },
  filePath: { type: String, required: true }, // e.g. "/music/sample1.mp3"
  albumArt: { type: String },                 // e.g. "/images/albumArt.png"
  duration: { type: Number },                 // Track length in seconds
}, { timestamps: true });

export default mongoose.models.Track || mongoose.model('Track', TrackSchema);

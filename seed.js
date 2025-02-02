import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Track from './models/Track.js'; // Ensure the correct path

// Load environment variables from .env
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env');
}

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

const seedTracks = [
  {
    title: 'Strangers',
    artist: 'Kenya Grace',
    album: 'Kenya Grace Debut', // Adjust album as needed
    filePath: '/music/sample6.mp3',
    albumArt: '/images/strangers.png',
    duration: 215,
  },
];

async function seedDB() {
  try {
    await connectDB(); // Ensure the database is connected
    console.log('Seeding database...');

    // Insert the new track(s) without deleting existing ones.
    await Track.insertMany(seedTracks);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDB();

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
    title: "Baby I'm Back",
    artist: 'The Kid LAROI',
    album: 'Debut Album', // Adjust album as needed
    filePath: '/music/baby-im-back.mp3', // Ensure file exists in public/music
    albumArt: '/images/babyImBack.png', // Ensure image exists in public/images
    duration: 200, // Example duration in seconds
  },
  {
    title: 'Sucker',
    artist: 'Jonas Brothers',
    album: 'Sucker (Single)', // Adjust album as needed
    filePath: '/music/sucker.mp3',
    albumArt: '/images/sucker.png',
    duration: 180,
  },
  {
    title: 'Lose Yourself',
    artist: 'Eminem',
    album: '8 Mile Soundtrack', // Adjust album as needed
    filePath: '/music/lose-yourself.mp3',
    albumArt: '/images/loseYourself.png',
    duration: 326,
  },
  {
    title: 'You and I',
    artist: 'One Direction',
    album: 'Midnight Memories', // Adjust album as needed
    filePath: '/music/you-and-i.mp3',
    albumArt: '/images/youAndI.png',
    duration: 240,
  },
  {
    title: 'Cake by the Ocean',
    artist: 'DNCE',
    album: 'DNCE (Self-titled)', // Adjust album as needed
    filePath: '/music/cake-by-the-ocean.mp3',
    albumArt: '/images/cakeByTheOcean.png',
    duration: 215,
  },
];

async function seedDB() {
  try {
    await connectDB(); // Ensure the database is connected
    console.log('Seeding database...');

    await Track.deleteMany({}); // Clear existing data
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

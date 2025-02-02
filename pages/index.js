import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center"
      >
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Welcome to Andromeda
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Your local music streaming experience reimagined. Enjoy your tunes
          with a modern, immersive design that elevates your listening journey.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/library"
            className="bg-primary text-black px-6 py-3 rounded-full font-bold hover:bg-green-600 transition"
          >
            Explore Library
          </Link>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

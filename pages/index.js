// pages/index.js
import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center"
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
          Welcome to Andromeda
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8">
          Your local music streaming experience reimagined with cutting-edge design.
          Enjoy a seamless, immersive listening journey.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
          <Link
            href="/library"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            Explore Library
          </Link>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

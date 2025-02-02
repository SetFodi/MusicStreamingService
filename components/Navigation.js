// components/Navigation.js
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCog } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-5 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-white"
      >
        <Link href="/">Andromeda</Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6"
      >
        <Link
          href="/library"
          className="text-gray-300 hover:text-white transition-colors text-lg"
        >
          Library
        </Link>
        <Link
          href="/playlist"
          className="text-gray-300 hover:text-white transition-colors text-lg"
        >
          Playlist
        </Link>
        <motion.button
          whileHover={{ rotate: 90 }}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaCog size={24} />
        </motion.button>
      </motion.div>
    </nav>
  );
}

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCog } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="bg-gray-900 bg-opacity-90 backdrop-blur-md p-4 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold text-primary"
      >
        <Link href="/">Andromeda</Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-6"
      >
        <Link
          href="/library"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          Library
        </Link>
        <Link
          href="/playlist"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          Playlist
        </Link>
        {/* Settings button (expand functionality as needed) */}
        <motion.button
          whileHover={{ rotate: 90 }}
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          <FaCog size={20} />
        </motion.button>
      </motion.div>
    </nav>
  );
}

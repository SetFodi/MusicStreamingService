// components/Layout.js
import React from 'react';
import Navigation from './Navigation';
import PlayerControls from './PlayerControls';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white flex flex-col pt-20">
      {/* Fixed Navigation */}
      <Navigation />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32">{children}</main>
      {/* Persistent Player */}
      <PlayerControls />
    </div>
  );
}

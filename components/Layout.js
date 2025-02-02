import React from 'react';
import Navigation from './Navigation';
import PlayerControls from './PlayerControls';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col pt-16">
      <Navigation />
      <main className="flex-1 overflow-y-auto pb-24">{children}</main>
      <PlayerControls />
    </div>
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954', // Spotify-like green
        secondary: '#191414', // Dark background
        card: '#222222', // Darker card background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'xl': '0 4px 10px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'sm': '4px',
      }
    },
  },
  plugins: [],
};

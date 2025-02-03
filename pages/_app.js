// pages/_app.js
import '../styles/globals.css';
import { PlaylistProvider } from '../context/PlaylistContext'; // if you use it for playlists
import { PlayerProvider } from '../context/PlayerContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <PlaylistProvider>
      <PlayerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PlayerProvider>
    </PlaylistProvider>
  );
}

export default MyApp;

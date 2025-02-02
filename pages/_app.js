// pages/_app.js
import '../styles/globals.css';
import { PlaylistProvider } from '../context/PlaylistContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <PlaylistProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlaylistProvider>
  );
}

export default MyApp;

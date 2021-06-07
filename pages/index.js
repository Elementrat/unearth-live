import Head from 'next/head';
import Home from './home/Home';
import AppRoot from '../components/AppRoot';

export default function Index() {
  return (
    <div>
      <Head>
        <title>Unearth Live</title>
        <meta name="description" content="Record and share audio snippets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppRoot>
        <Home />
      </AppRoot>
    </div>
  );
}

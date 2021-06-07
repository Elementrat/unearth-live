import Head from 'next/head';
import BrowsePage from './browse/Browse';
import AppRoot from '../components/AppRoot';

export default function Browse() {
  return (
    <div>
      <Head>
        <title>Browse</title>
        <meta name="description" content="Record and share audio snippets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppRoot>
        <BrowsePage />
      </AppRoot>
    </div>
  );
}

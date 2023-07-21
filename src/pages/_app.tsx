import { RecoilRoot } from 'recoil';

import Layout from '../components/Layout';
import 'animate.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const isServer = typeof window === 'undefined';
  const WOW = !isServer ? require('wow.js') : null;

  useEffect(() => {
    new WOW({
      boxClass: 'wow', // default
      animateClass: 'animated', // default
      offset: 0, // default
      mobile: true, // default
      live: true, // default
    }).init();
  }, []);
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;

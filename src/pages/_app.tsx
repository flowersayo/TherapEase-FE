import { RecoilRoot } from 'recoil';

import Layout from '../components/Layout';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;

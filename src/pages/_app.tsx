import { RecoilRoot } from 'recoil';

import Layout from '../components/Layout';
import 'animate.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import ClientProviders from '@/utils/useClient';
import { IUser } from '@/interfaces/interfaces';
import { queryKeys } from '@/constants/queryKeys';
import { getUser } from '@/hooks/useUser';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { clearUser, updateUser, saveUser } from '@/hooks/useUser';
import { QueryKey } from 'react-query';
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
  // 기존 user의 값을 이용해서 user의 값을 업데이트한다.

  return (
    <ClientProviders>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </ClientProviders>
  );
};

export default App;

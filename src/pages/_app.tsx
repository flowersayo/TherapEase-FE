import { RecoilRoot } from 'recoil';

import Layout from '../components/Layout';
import 'animate.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { IUser } from '@/interfaces/interfaces';
import { queryKeys } from '@/constants/queryKeys';
import { getUser } from '@/hooks/useUser';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { clearUser, updateUser } from '@/hooks/useUser';
import { QueryKey } from 'react-query';
import React from 'react';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';

const App = ({ Component, pageProps }: AppProps) => {
  const isServer = typeof window === 'undefined';
  const WOW = !isServer ? require('wow.js') : null;

  const [client] = React.useState(new QueryClient()); // 페이지가 바뀌어도 동일한 클라이언트 유지

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
      <QueryClientProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;

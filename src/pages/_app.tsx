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

  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 0, // 캐시 유지 기간
          staleTime: 0, // 데이터의 실레(stale) 기간 -> 데이터가 캐시에 stale한 상태로 표시나면, 이 기간 동안에는 캐시된 데이터를 사용하면서 동시에 서버에 새로운 데이터를 가져오도록 요청이 전송
        },
      },
    }),
  ); // 페이지가 바뀌어도 동일한 클라이언트 유지

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

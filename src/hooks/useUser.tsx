import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/interfaces/interfaces';
import { queryKeys } from '@/constants/queryKeys';
import { USER_LOCALSTORAGE_KEY } from '@/constants/constants';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/constants';
import { userState } from '@/store/user';
import { getUser } from './queries/user';
import { QueryKey } from 'react-query';
import { useRouter } from 'next/router';

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  const accessToken = getStoredToken(); // 로컬 스토리지에서 토큰 정보 가져옴

  if (!accessToken) {
    resetUserState();
  }

  const queryKey: QueryKey = queryKeys.user;
  return useQuery([queryKey], getUser, {
    enabled: user === null, // 새로고침해서 user value 가 날아갔을 때에만
    onSuccess: (data: IUser | null) => {
      if (!data) {
        resetUserState();
        clearUser(); // access_token 이 유효하지 않은 경우 or 로그인 중이 아닐경우
      } else {
        setUser(data);
        console.log('onsuccess');
        console.log(data);
      }
    },
    onError: (e) => {
      console.log(e);

      //401 unauthorization
      resetUserState();
      console.log('authorization failed');
      router.push('/'); // 랜딩페이지로
    },
  });
};

const updateUser = (newUser: IUser): void => {
  //queryClient.setQueryData(queryKeys.user, newUser); // React Query 유저 캐시를 업데이트
};

const clearUser = () => {
  // 로그아웃 처리

  //queryClient.setQueryData(queryKeys.user, null);
  removeStoredToken();
};

const saveUser = (user: IUser) =>
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));

const saveToken = (access_token: string, refresh_token: string) => {
  localStorage.setItem(ACCESS_TOKEN, access_token);
  localStorage.setItem(REFRESH_TOKEN, refresh_token);
};

const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ACCESS_TOKEN);
  }
};
const removeStoredToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
};
export { useUser, saveToken, updateUser, clearUser, getUser };

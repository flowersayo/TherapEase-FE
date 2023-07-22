import { useQueryClient } from '@tanstack/react-query';
import { IUser } from '@/interfaces/interfaces';
import { queryKeys } from '@/constants/queryKeys';
import { USER_LOCALSTORAGE_KEY } from '@/constants/constants';

/*
  const queryClient = useQueryClient();

*/

function updateUser(newUser: IUser): void {
  //queryClient.setQueryData(queryKeys.user, newUser); // React Query 유저 캐시를 업데이트
}

function clearUser() {
  // 로그아웃 처리
  //queryClient.setQueryData(queryKeys.user, null);
  //setIsSignedIn(false);
}

const saveUser = (user: IUser) =>
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
const getUser = () => {
  if (typeof window !== 'undefined') {
    let userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }
};

export { updateUser, clearUser, saveUser, getUser };

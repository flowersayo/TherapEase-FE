import axios from 'axios';
import { API_BASE_SERVER_URL } from '@/constants/Config';
import { USER_LOCALSTORAGE_KEY } from '@/constants/constants';
import { IUser } from '@/interfaces/interfaces';

const AxiosModule = () => {
  let token = null;
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (userData) {
      const user: IUser = JSON.parse(userData);
      token = user?.access;
    }
  }
  return axios.create({
    baseURL: API_BASE_SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  });
};

const HTTP = AxiosModule(); // 매 API 실행 요청시에 새롭게 token 존재 여부를 refresh 할 수 있도록.
export default HTTP;

import HTTP from '@/utils/HTTP';
import axios from 'axios';

export const login = async (body: { code: string }) => {
  const response = await HTTP.post(`/accounts/login/`, body);

  return response.data;
};

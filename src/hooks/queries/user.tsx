import HTTP from '@/utils/HTTP';

export const login = async (body: { code: string }) => {
  const response = await HTTP.post(`/accounts/login/`, body);

  return response.data;
};

export const getUser = async () => {
  const response = await HTTP.get(`/accounts/check/`);

  const partnerId = parseInt(response.data.accountId);

  return {
    ...response.data,
    partnerId: partnerId,
  };
};

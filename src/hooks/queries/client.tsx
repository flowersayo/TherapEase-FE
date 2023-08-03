import HTTP from '@/utils/HTTP';
import { ITimeTable, ICounselorProfile } from '@/interfaces/interfaces';

export const getClient = async () => {
  const response = await HTTP.get(`/counselees/list/`);

  return response.data;
};

export const addClient = async (body: { code: string }) => {
  const response = await HTTP.post(`/counselees/`, body);

  return response.data;
};

export const updateClient = async (counseleeId: number | string, body: any) => {
  const response = await HTTP.patch(`/counselees/${counseleeId}/`, body);

  return response.data;
};

export const deleteClient = async (counseleeId: number | string) => {
  const response = await HTTP.delete(`/counselees/delete/${counseleeId}/`);

  return response.data;
};

export const changeCounseleeStatus = async (counseleeId: number | string) => {
  const response = await HTTP.patch(`/counselees/complete/${counseleeId}/`);

  return response.data;
};

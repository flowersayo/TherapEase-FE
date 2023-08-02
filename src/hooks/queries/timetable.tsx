import HTTP from '@/utils/HTTP';
import { ITimeTable, ICounselorProfile } from '@/interfaces/interfaces';

export const getTimetable = async (counselorId: any) => {
  const response = await HTTP.get(`/schedule/${counselorId}/`);

  return response.data;
};

export const updateTimetable = async (counselorId: any, body: ITimeTable) => {
  const response = await HTTP.put(`/schedule/${counselorId}/`, body);

  return response.data;
};
export const getCounselorProfile = async (counselorId: any) => {
  const response = await HTTP.get(`/accounts/profile/`);

  return response.data;
};
export const updateCounselorProfile = async (
  counselorId: any,
  body: ICounselorProfile,
) => {
  const response = await HTTP.patch(`/accounts/profile/`, body);

  return response.data;
};

import dayjs from 'dayjs';

// DATE -> 'M월 DD일'
export const parseDateString = (dateString: string) => {
  return dayjs(dateString).format('M월 DD일');
};

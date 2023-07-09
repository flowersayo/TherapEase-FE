import { atom } from 'recoil';

export const isSignedInState = atom<boolean>({
  key: 'isSignedInState',
  default: true,
});

export const isCounselorState = atom<boolean | null>({
  key: 'isCounselorState',
  // default: null,
  default: true,
});

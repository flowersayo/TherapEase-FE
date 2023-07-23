import { atom, atomFamily } from 'recoil';
import { Iclient } from '@/interfaces/interfaces';

import { DUMMY_CLIENTS_LIST } from '@/constants/DUMMY_DATA';

export const isSignedInState = atom<boolean>({
  key: 'isSignedInState',
  default: false,
});

export const isCounselorState = atom<boolean | null>({
  key: 'isCounselorState',
  // default: null,
  default: false,
});

export const clientsListState = atom<Iclient[]>({
  key: 'clientsListState',
  // default: [],
  default: DUMMY_CLIENTS_LIST,
});

// export const currentClientState = atomFamily<Iclient, string>({
//   key: 'currentClientState',
//   default: (id) => {
//     const currentClient = DUMMY_CLIENTS_LIST.find(
//       (client) => client.counseleeId === id,
//     );
//     return currentClient;
//   },
// });

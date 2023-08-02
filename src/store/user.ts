import { atom, atomFamily } from 'recoil';
import { Iclient, IUser } from '@/interfaces/interfaces';

import { DUMMY_CLIENTS_LIST } from '@/constants/DUMMY_DATA';

export const userState = atom<IUser|null>({
  key: 'userState',
  default: null,
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

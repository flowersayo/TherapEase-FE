import { atom, atomFamily } from 'recoil';
import { IClient, IUser } from '@/interfaces/interfaces';

export const userState = atom<IUser | null>({
  key: 'userState',
  default: null,
});

export const clientsListState = atom<IClient[]>({
  key: 'clientsListState',
  // default: [],
  default: [],
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

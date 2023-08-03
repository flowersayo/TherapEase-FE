// 좌측 네비게이션 바
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useRecoilValue } from 'recoil';
import { clientsListState } from '@/store/user';

import { IClient } from '@/interfaces/interfaces';

const LeftBar = () => {
  const router = useRouter();

  const clientsList = useRecoilValue<IClient[]>(clientsListState);
  console.log(clientsList);

  return (
    <aside className="fixed w-[13.9rem] h-full py-[6.638rem] bg-gray-3 overflow-y-scroll">
      {clientsList.map((client: IClient) => {
        const isSelected = client.id === parseInt(router.query.id as string);

        return (
          <Link
            key={client.id}
            className={`w-full h-[3.9rem] flex justify-center items-center hover:bg-gray-4 hover:text-black ${
              isSelected ? 'bg-gray-4' : 'bg-transparent text-gray-4'
            }`}
            href={{ pathname: '/records', query: { id: client.id } }}
          >
            <span className="text-body2 cursor-pointer">{client.name}</span>
          </Link>
        );
      })}
    </aside>
  );
};

export default LeftBar;

// 좌측 네비게이션 바
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useRecoilValue } from 'recoil';
import { clientsListState } from '@/store/recoil';

import { Iclient } from '@/interfaces/interfaces';

const LeftBar = () => {
  const router = useRouter();

  const clientsList = useRecoilValue<Iclient[]>(clientsListState);

  return (
    <aside className="fixed w-[13.9rem] h-full py-[6.638rem] bg-gray-3 overflow-y-scroll">
      {clientsList.map((client: Iclient) => {
        const isSelected = client.counseleeId === router.query.id;

        return (
          <Link
            key={client.counseleeId}
            className={`w-full h-[3.9rem] flex justify-center items-center hover:bg-gray-4 hover:text-black ${
              isSelected ? 'bg-gray-4' : 'bg-transparent text-gray-4'
            }`}
            href={{ pathname: '/records', query: { id: client.counseleeId } }}
            as={'/records'}
          >
            <span className="text-body2 cursor-pointer">
              {client.counseleeName}
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default LeftBar;

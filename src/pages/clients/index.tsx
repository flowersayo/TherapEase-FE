import { useRecoilState } from 'recoil';
import { clientsListState } from '@/store/recoil';

import { Iclient } from '@/interfaces/interfaces';
import ClientCard from '@/components/ClientCard';

const ClientsPage = () => {
  const [clientsList, setClientsList] =
    useRecoilState<Iclient[]>(clientsListState);

  return (
    <div className="w-[calc(100%-20.6rem)] h-full mx-auto py-[5.953rem]">
      {/* 페이지 헤더 영역 */}
      <div className="flex flex-col ml-[24px]">
        <span className="text-heading2 text-gray-9">내담자 관리</span>
        <span className="text-body3 text-gray-7">
          내담자 목록을 관리하고, 상담 목표를 리마인드하세요.
        </span>
        <span className="text-body3 text-gray-7">
          내담자가 작성한 감정 기록을 참고해 상담의 질을 향상시키세요.
        </span>
      </div>

      {/* 내담자 카드 리스트 영역 */}
      <div className="w-full flex flex-wrap justify-center gap-[1.6rem] mt-[3.236rem]">
        {clientsList.map((client: Iclient) => {
          return (
            <div className="card">
              <ClientCard clientInfo={client} detailMenu={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientsPage;

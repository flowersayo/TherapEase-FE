import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { clientsListState } from '@/store/recoil';

import { Iclient } from '@/interfaces/interfaces';
import ClientCard from '@/components/ClientCard';
import { ButtonSmall } from '@/components/Buttons';

import { IoMdPersonAdd } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';

const ClientsPage = () => {
  const [clientsList, setClientsList] =
    useRecoilState<Iclient[]>(clientsListState);

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-[calc(100%-20.6rem)] h-full mx-auto py-[5.953rem]">
      {/* 페이지 헤더 영역 */}
      <div className="flex justify-between">
        <div className="flex flex-col ml-[24px]">
          <span className="text-heading2 text-gray-9">내담자 관리</span>
          <span className="text-body3 text-gray-7">
            내담자 목록을 관리하고, 상담 목표를 리마인드하세요.
          </span>
          <span className="text-body3 text-gray-7">
            내담자가 작성한 감정 기록을 참고해 상담의 질을 향상시키세요.
          </span>
        </div>

        <div className="flex h-fit gap-[1.2rem] mt-[0.263rem]">
          <div className="flex items-center gap-[0.8rem] bg-white pl-[1rem] pr-[2rem] py-[0.8rem] rounded-[0.8rem]">
            <CiSearch size={16} color={'#999999'} />
            <input
              className="text-[1.4rem] font-medium leading-[160%] text-gray-5  focus:outline-none"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="내담자 검색 ex. 김민수"
              spellCheck="false"
            />
          </div>
          <ButtonSmall
            icon={<IoMdPersonAdd size={16} />}
            text="내담자 추가"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* 내담자 카드 리스트 영역 */}
      {clientsList.length ? (
        <div className="w-full flex flex-wrap justify-center gap-[1.6rem] mt-[3.236rem]">
          {clientsList
            .filter((client: Iclient) =>
              client.counseleeName.includes(inputValue),
            )
            .map((client: Iclient) => {
              return (
                <div className="card">
                  <ClientCard clientInfo={client} detailMenu={true} />
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col items-center text-heading3 text-gray-5 mt-[22.1rem]">
          <span>아직 등록된 내담자가 없습니다.</span>
          <span>내담자 추가를 통해 내담자를 추가하세요!</span>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;

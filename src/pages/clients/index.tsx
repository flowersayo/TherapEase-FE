import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { clientsListState } from '@/store/recoil';

import { Iclient } from '@/interfaces/interfaces';
import ClientCard from '@/components/ClientCard';
import { ButtonLarge, ButtonSmall } from '@/components/Buttons';

import { IoMdPersonAdd } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { TfiClose } from 'react-icons/tfi';

const ClientsPage = () => {
  const [clientsList, setClientsList] =
    useRecoilState<Iclient[]>(clientsListState);

  // 내담자 검색
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  // 내담자 추가
  const [addInputValue, setAddInputValue] = useState<string>('');
  const [isAddingClient, setIsAddingClient] = useState<boolean>(false);
  const [addValidationError, setAddValidationError] = useState<boolean>(false);

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddInputValue(e.target.value);

    setAddValidationError(false);
  };

  const handleAddSubmit = () => {
    try {
      // TODO - 내담자 validation api 연동
      // setClientsList()

      onCloseAddModal();
    } catch (e) {
      setAddValidationError(true);
    }
  };

  const onCloseAddModal = () => {
    setAddInputValue('');
    setIsAddingClient(false);
    setAddValidationError(false);
  };

  return (
    <>
      <div className="relative w-[calc(100%-20.6rem)] h-full mx-auto py-[5.953rem]">
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
                className="text-[1.4rem] font-medium leading-[160%] text-gray-5 focus:outline-none"
                value={searchInputValue}
                onChange={handleSearchInputChange}
                placeholder="내담자 검색 ex. 김민수"
                spellCheck="false"
              />
            </div>
            <ButtonSmall
              icon={<IoMdPersonAdd size={16} />}
              text="내담자 추가"
              onClick={() => {
                setIsAddingClient(true);
              }}
            />
          </div>
        </div>

        {/* 내담자 카드 리스트 영역 */}
        {clientsList.length ? (
          // 내담자 존재
          <div className="w-full flex flex-wrap justify-center gap-[1.6rem] mt-[3.236rem]">
            {clientsList.filter((client: Iclient) =>
              client.counseleeName.includes(searchInputValue),
            ).length ? (
              // 검색어 일치하는 내담자 존재
              clientsList
                .filter((client: Iclient) =>
                  client.counseleeName.includes(searchInputValue),
                )
                .map((client: Iclient) => {
                  return (
                    <div className="card">
                      <ClientCard clientInfo={client} detailMenu={true} />
                    </div>
                  );
                })
            ) : (
              // 검색어 일치하는 내담자 존재 x
              <div className="flex flex-col items-center text-heading3 text-gray-5 mt-[22.1rem]">
                <span>일치하는 내담자가 없습니다.</span>
              </div>
            )}
          </div>
        ) : (
          // 내담자 존재 x
          <div className="flex flex-col items-center text-heading3 text-gray-5 mt-[22.1rem]">
            <span>아직 등록된 내담자가 없습니다.</span>
            <span>내담자 추가를 통해 내담자를 추가하세요!</span>
          </div>
        )}

        {isAddingClient && (
          <div className="absolute top-0 left-[-10.3rem] w-screen h-full bg-[#0000004d] z-[10000]">
            <div className="absolute top-[calc(50vh-17.78rem)] left-[calc(50vw-31.15rem)] bg-white px-[12.7rem] pt-[2.05rem] pb-[2.45rem] rounded-[2rem] flex flex-col items-center">
              <span className="text-heading3 text-black mb-[5.1rem]">
                내담자 추가
              </span>
              <span className="text-body2 text-gray-9 mb-[2.4rem]">
                추가할 내담자의 코드를 입력하세요
              </span>
              <input
                className={`w-[37rem] text-body1 font-medium ${
                  addValidationError
                    ? 'text-[#FF4127] bg-[#FFF5F5] border-[#FF4127]'
                    : 'text-gray-9'
                } placeholder:text-gray-5 px-[2.1rem] py-[1.6rem] mb-[5.1rem] border-[.1rem] border-gray-3 rounded-[0.5rem] focus:outline-none`}
                value={addInputValue}
                onChange={handleAddInputChange}
                placeholder="내담자의 발급 코드 입력"
                spellCheck="false"
              />
              <ButtonLarge
                text="추가하기"
                onClick={handleAddSubmit}
                disabled={!addInputValue.length}
              />
            </div>
            <TfiClose
              className="absolute top-[calc(50vh-17.78rem+3.2rem)] left-[calc(50vw+31.15rem-2.6rem-2.5rem)]"
              size={25}
              cursor={'pointer'}
              onClick={onCloseAddModal}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ClientsPage;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BsList, BsCheckLg } from 'react-icons/bs';
import { BiSolidPencil } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';

import { IClient } from '@/interfaces/interfaces';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  updateClient,
  deleteClient,
  changeCounseleeStatus,
  addClient,
} from '@/hooks/queries/client';

import { queryKeys } from '@/constants/queryKeys';

interface Props {
  clientInfo: IClient;
  detailMenu?: boolean;
  setSelectedClient?: (clientInfo: IClient) => void;
  setIsDeleteModalVisible?: (value: boolean) => void;
}

const ClientCard = ({
  clientInfo,
  detailMenu = false,
  setSelectedClient,
  setIsDeleteModalVisible,
}: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    name,
    id,
    start,
    progress,
    counselingDate,

    goal,
  } = clientInfo;

  const clientMutation: UseMutationResult<IClient, any, string> = useMutation(
    async (type: string) => {
      switch (type) {
        case 'change_status': // 상태 변경
          console.log('change');
          return await changeCounseleeStatus(id);

        case 'update': // 상담 목적 수정
          var body = {
            goal: goalInputValue,
          };
          return await updateClient(id, body);
      }
    },
    {
      onError: (error, variable, context) => {
        // error
        console.log(error);
      },
      onSuccess: (data: IClient, variables, context) => {
        console.log('client mutate success', data, variables, context);
        // 내담자 목록 refetch
        queryClient.invalidateQueries({
          queryKey: [queryKeys.clientList],
        });
      },
    },
  );

  const [isDetailMenuClicked, setIsDetailMenuClicked] =
    useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [goalInputValue, setGoalInputValue] = useState<string>(goal);

  useEffect(() => {
    setIsDetailMenuClicked(false);
    setIsEditMode(false);
    setGoalInputValue(goal);
  }, [clientInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoalInputValue(e.currentTarget.value);
  };

  const handleInputSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();

    clientMutation.mutate('update');
    // TODO - api 연동
    setIsEditMode(!isEditMode);
  };

  const handleDetailMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsDetailMenuClicked(!isDetailMenuClicked);
  };

  const handleDeleteClient = (e: React.MouseEvent) => {
    e.stopPropagation();

    // TODO - api 연동 - 내담자 삭제
    setSelectedClient ? setSelectedClient(clientInfo) : null;
    setIsDeleteModalVisible ? setIsDeleteModalVisible(true) : null;
  };

  const handleDoneClient = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO - api 연동 - 내담자 완료처리
    clientMutation.mutate('change_status');
    setIsDetailMenuClicked(false);
  };

  return (
    <div
      className={`w-[33.2rem] h-[28.5rem] p-[2.2rem] text-body4 text-gray-9 bg-white rounded-[2.0rem] flex flex-col ${
        detailMenu && 'cursor-pointer'
      }`}
      onClick={() => {
        !isEditMode && router.push(`/records?id=${id}`, '/records');
      }}
    >
      <div className="flex justify-between">
        <span className="text-body1 mb-[.35rem]">{name}</span>
        {detailMenu && (
          <div
            className={`relative w-[3.0rem] h-[3.0rem] ml-auto rounded-[.419rem] flex items-center justify-center cursor-pointer ${
              isDetailMenuClicked ? 'bg-gray-3' : null
            }`}
            onClick={() => {}}
          >
            <FiMoreHorizontal
              size={24.8}
              color={'#DCDCDC'}
              cursor={'pointer'}
              onClick={handleDetailMenuClick}
              style={{ zIndex: 9999 }}
            />

            {isDetailMenuClicked && (
              <div className="absolute top-[3.25rem] left-0 flex flex-col items-center px-[1.6rem] py-[1.0rem] text-gray-6 bg-white border-[.1rem] border-gray-3 rounded-[.4rem] shadow-[0_0_0.8rem_0_rgba(0,0,0,0.05)]">
                <span
                  className="w-full rounded-[0.4rem] hover:bg-gray-2"
                  onClick={handleDeleteClient}
                >
                  내담자 삭제
                </span>
                <div className="w-[5.6rem] h-[.1rem] my-[.8rem] bg-gray-4"></div>
                <span
                  className="w-full text-center rounded-[0.4rem] hover:bg-gray-2"
                  onClick={handleDoneClient}
                >
                  상담 완료
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center mb-[.6rem] gap-[.4rem]">
        <span className="px-[.6rem] rounded-[.4rem] bg-gray-4">
          {progress ? '상담중' : '상담 완료'}
        </span>
        <div className="w-[.1rem] h-[1.4rem] mx-[.4rem] bg-gray-4"></div>
        <span className="px-[.6rem] rounded-[.4rem] bg-yellow-100">
          {counselingDate}
        </span>
        {/**<span className="px-[.6rem] rounded-[.4rem] bg-gray-3">
          {counselingTime}
        </span> */}
      </div>

      <div className="flex items-center gap-[.4rem]">
        <span className="px-[.6rem] rounded-[.4rem] bg-gray-2">상담시작일</span>
        <div className="w-[.1rem] h-[1.4rem] mx-[.4rem] bg-gray-4"></div>
        <span className="px-[.6rem] rounded-[.4rem] bg-gray-2">
          {start.substring(0, 10)}
        </span>
      </div>
      <hr className="mt-[1.3rem] mb-[1.2rem]"></hr>
      <div className="flex items-center">
        <BsList size={17} color={'#737373'} />
        <span className="ml-[.4rem] mt-[.2rem] text-gray-8">상담 목표</span>
        <div
          className={`w-[2.096rem] h-[2.096rem] ml-auto rounded-[.419rem] flex items-center justify-center cursor-pointer ${
            isEditMode ? 'bg-yellow-100' : 'bg-gray-3'
          }`}
          onClick={handleInputSubmit}
        >
          {isEditMode ? (
            <BsCheckLg size={10.7} color={'#737373'} />
          ) : (
            <BiSolidPencil size={10.7} color={'#ACACAC'} />
          )}
        </div>
      </div>
      {isEditMode ? (
        <div className="relative mt-[.9rem]">
          <textarea
            className="w-full h-[10.5rem] text-body4 text-gray-9 bg-gray-2 rounded-[.4rem] px-[.5rem] py-[.3rem] resize-none focus:outline-none"
            value={goalInputValue}
            onChange={handleInputChange}
            placeholder="상담 목표를 적어주세요."
            maxLength={99}
            spellCheck="false"
          ></textarea>
          <span className="absolute bottom-[1.2rem] right-[.9rem] text-label2 text-gray-5 select-none z-10">
            {goalInputValue.length} / 100
          </span>
        </div>
      ) : (
        <div className="mt-[.9rem] text-gray-8 whitespace-pre-wrap">
          {goalInputValue}
        </div>
      )}
    </div>
  );
};

export default ClientCard;

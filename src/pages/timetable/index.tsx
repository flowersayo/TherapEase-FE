// TimeTable Page
import { useState } from 'react';
import Profile from '@/components/timetable/Profile';
import TimeTable from '@/components/timetable/TimeTable';
import Image from 'next/image';
import CalendarIconSrc from '../../assets/icons/calendar.svg';
import { useRecoilValue } from 'recoil';

import { isCounselorState } from '@/store/user';
const TimeTablePage = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  const isCounselor = useRecoilValue(isCounselorState);

  return (
    <div
      className="w-full h-full flex flex-row justify-center items-start 
    gap-4  mt-[6.6rem] box-border"
    >
      <div className="flex flex-col gap-4">
        <Profile editable={isEditMode} />
        {isCounselor && (
          <EditBtn isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
        )}
      </div>
      <div
        className="w-[75rem] h-[77.6rem] rounded-2xl bg-white flex
        flex-col  py-[2.6rem] px-[5rem]"
      >
        <div className="flex flex-col justify-center mb-[2.5rem]">
          <span className="text-heading4 text-black">상담 가능 시간</span>
          <span className="text-body3 text-gray-5">
            실시간 예약 가능 시간과 차이가 있을 수 있습니다.
          </span>
          <span className="text-body3 text-gray-5">
            5월 24일 05시 32분 업데이트
          </span>
        </div>
        <TimeTable isEditMode={isEditMode} />
      </div>
    </div>
  );
};

const EditBtn = ({
  isEditMode,
  setIsEditMode,
}: {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}) => {
  const handleOnClickBtn = () => {
    if (isEditMode) {
      // 데이터 저장 요청
      setIsEditMode(false);
    } else {
      // 수정모드 진입
      setIsEditMode(true);
    }
  };
  const btnText = isEditMode
    ? '시간표 및 상담정보 적용하기'
    : '시간표 및 상담정보 수정하기';
  return (
    <button
      className="w-[26rem] h-[4rem] bg-yellow-20 px-[3.9rem] py-[0.8rem]  rounded-lg
     cursor-pointer hover:outline hover:outline-1  hover:outline-yellow-120 "
      onClick={handleOnClickBtn}
    >
      <div className="flex flex-row items-center gap-2">
        <Image src={CalendarIconSrc} alt="calendar" />
        <span className="text-body3 text-yellow-120 ">{btnText}</span>
      </div>
    </button>
  );
};

export default TimeTablePage;

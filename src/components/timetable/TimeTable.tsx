import React from 'react';
import { CSSProperties } from 'react';
import TimeTableCol from './TimeTableCol';
import { useRecoilState } from 'recoil';
import { timeTableState } from '@/store/timetable';

export default function TimeTable({ isEditMode }: { isEditMode: boolean }) {
  return (
    <div className="rounded-2xl bg-white grid grid-cols-[30px_1fr] w-[100%]">
      <TimeBar />
      <div>
        <THead />
        <TBody disabled={!isEditMode} />
      </div>
    </div>
  );
}
const THead = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const tableHeadTextStyle: CSSProperties = {
    color: '#ACACAC',
    textAlign: 'center',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '160%',
  };
  return (
    <div className="grid pb-[0.95rem] grid-cols-7 w-[63rem] border-b-[1px] ">
      {days.map((day) => (
        <span key={day} className="table-cell p-1 align-inherit text-center">
          <span style={tableHeadTextStyle}>{day}</span>
        </span>
      ))}
    </div>
  );
};

const TBody = ({ disabled }: { disabled: boolean }) => {
  // 타임테이블 데이터로 최초 fetching 시에 timetable recoil값 초기화
  const [timeTableData, setTimeTableData] = useRecoilState(timeTableState);
  const days_en = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const overlayStyle = disabled ? 'z-2 pointer-events-none' : '';
  return (
    <div className={`grid w-[63rem] grid-cols-7 ${overlayStyle}`}>
      {days_en.map((day_en, idx) => (
        <TimeTableCol
          key={day_en + idx}
          day={day_en}
          avaliability={timeTableData[day_en]}
        />
      ))}
    </div>
  );
};

const TimeBar = () => {
  const hourData = Array.from({ length: 16 }, (v, i) => i + 7); // [7 ... 22]

  return (
    <div className="flex flex-col items-end pr-[1rem] mt-[3.1rem]">
      {hourData.map((hour) => (
        <div key={hour} className="h-[3.8rem] ">
          <span className="text-body-4 text-gray-4 text-start self-start">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

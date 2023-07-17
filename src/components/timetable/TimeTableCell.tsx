import React, { useState } from 'react';
import AvailableTimeSvgSrc from '../../assets/icons/available-time.svg';
import { useRecoilState } from 'recoil';
import { timeTableState } from '@/store/timetable';

export default function TimeTableCell({
  available,
  day,
  idx,
}: {
  available: Boolean;
  day: string;
  idx: number;
}) {
  const [timeTableData, setTimeTableData] = useRecoilState(timeTableState);

  const [availableState, setAvailableState] = useState<Boolean>(available);
  const handleToggleState = () => {
    setAvailableState((prev) => !prev);

    // recoil 전역 상태 변경
    setTimeTableData((oldtimeTableData) => {
      const newDayData = [...oldtimeTableData[day]];
      newDayData[idx] = !newDayData[idx];
      // console.log(day, idx, oldtimeTableData[day][idx], '->', newDayData[idx]);
      return {
        ...oldtimeTableData,
        [day]: newDayData,
      };
    });
  };
  if (availableState) {
    return (
      <button
        className="w-[9rem] h-[3.8rem] pb-1 relative"
        onClick={handleToggleState}
        style={{
          borderBottom: '1px solid #DCDCDC',
          borderLeft: '1.8px dashed #DCDCDC',
        }}
      >
        <svg
          className="time-table__cell"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            marginLeft: '-2px',
            opacity: 0.8,
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="91"
          height="38"
          viewBox="0 0 91 38"
          fill="none"
        >
          <rect
            className="right"
            x="0.410156"
            y="0.256836"
            width="90"
            height="37"
            fill="#FDF2B4"
          />
          <rect
            className="left"
            x="0.410156"
            y="0.256836"
            width="4"
            height="37"
            fill="#FFE44D"
          />
        </svg>
        <style jsx>{`
          .time-table__cell:hover .left {
            fill: #dcdcdc;
          }
          .time-table__cell:hover .right {
            fill: #f7f7f7;
          }
        `}</style>
      </button>
    );
  } else {
    return (
      <button
        className="w-[9rem] h-[3.8rem] bg-gray-2 pb-1"
        onClick={handleToggleState}
        style={{
          borderBottom: '1px solid #DCDCDC',
          borderLeft: '1.8px dashed #DCDCDC',
        }}
      ></button>
    );
  }
}

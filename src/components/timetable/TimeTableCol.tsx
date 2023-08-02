import React from 'react';
import TimeTableCell from './TimeTableCell';
interface TimeTableColProps {
  day: string;
  avaliability: boolean[];
}
// 한 요일당 가능시간 여부 -> 15개의 시간 블럭
export default function TimeTableCol({ day, avaliability }: TimeTableColProps) {
  return (
    <div className="grid">
      {avaliability?.map((value, idx) => (
        <TimeTableCell key={idx} day={day} idx={idx} available={value} />
      ))}
    </div>
  );
}

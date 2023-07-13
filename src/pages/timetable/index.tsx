// TimeTable Page
import Profile from '@/components/timetable/Profile';
import TimeTable from '@/components/timetable/TimeTable';
import Image from 'next/image';
import CalendarIconSrc from '../../assets/icons/calendar.svg';

const TimeTablePage = () => {
  return (
    <div
      className="w-full h-full flex flex-row justify-center items-start 
    gap-4  mt-[6.6rem]"
    >
      <div className="flex flex-col gap-4 ">
        <Profile />
        <EditBtn />
      </div>
      <TimeTable />
    </div>
  );
};

const EditBtn = () => {
  return (
    <div
      className="w-[26rem] h-[4rem] bg-yellow-20 px-[3.9rem] py-[0.8rem] gap-2 rounded-lg
    flex flex-row cursor-pointer"
    >
      <Image src={CalendarIconSrc} alt="calendar" />
      <span className="text-body3 text-yellow-120 ">
        시간표 및 상담정보 수정하기
      </span>
    </div>
  );
};

export default TimeTablePage;

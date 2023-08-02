// TimeTable Page
import { useState } from 'react';
import { useRouter } from 'next/router';

import Profile from '@/components/timetable/Profile';
import TimeTable from '@/components/timetable/TimeTable';
import Image from 'next/image';
import LoadingSpinnerSrc from '../../assets/spinner.gif';
import CalendarIconSrc from '../../assets/icons/calendar.svg';

import { useRecoilValue, useRecoilState } from 'recoil';
import { counselorProfileState } from '@/store/timetable';
import { timeTableState } from '@/store/timetable';
import { userState } from '@/store/user';

import {
  getCounselorProfile,
  getTimetable,
  updateCounselorProfile,
  updateTimetable,
} from '@/hooks/queries/timetable';

import {
  QueryKey,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

import { ICounselorProfile, ITimeTable } from '@/interfaces/interfaces';
import { queryKeys } from '@/constants/queryKeys';

const TimeTablePage = () => {
  const router = useRouter();
  const { id: counselor_id } = router.query;

  const [isEditMode, setIsEditMode] = useState(false);

  const isAuthorized =
    useRecoilValue(userState)?.id === parseInt(counselor_id as string); // 상담사 본인만 수정 가능

  return (
    <div
      className="w-full h-full flex flex-row justify-center items-start 
    gap-4  mt-[6.6rem] box-border"
    >
      <div className="flex flex-col gap-4">
        <Profile editable={isEditMode} />
        {isAuthorized && (
          <EditBtn isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
        )}
      </div>

      <div
        className="w-[75rem] h-[77.6rem] rounded-2xl bg-white flex
        flex-col  py-[2.6rem] px-[5rem]"
      >
        <div className="flex flex-col justify-center mb-[2.5rem]">
          <span className="text-heading3 text-black">상담 가능 시간</span>
          <span className="text-body3 text-gray-5">
            실시간 예약 가능 시간과 차이가 있을 수 있습니다.
          </span>
          {/*<span className="text-body4 text-gray-5">업데이트</span>*/}
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
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id: counselorId } = router.query;

  const [couselorProfile, setCounselorProfile] = useRecoilState(
    counselorProfileState,
  );

  const [timetable, setTimeTable] = useRecoilState(timeTableState);

  const profileMutation: UseMutationResult<
    ICounselorProfile,
    any,
    ICounselorProfile
  > = useMutation(() => updateCounselorProfile(counselorId, couselorProfile), {
    onError: (error, variable, context) => {
      // error
      console.log(error);
    },
    onSuccess: (data: ICounselorProfile, variables, context) => {
      //console.log('profile mutate success');
      setCounselorProfile(data);
    },
  });

  const timetableMutation: UseMutationResult<ITimeTable, any, ITimeTable> =
    useMutation(() => updateTimetable(counselorId, timetable), {
      onError: (error, variable, context) => {
        // error
      },
      onSuccess: (data: ITimeTable, variables, context) => {
        console.log('timetable mutate success', data, variables, context);

        setTimeTable(data);
      },
    });

  const handlePararellMutate = async () => {
    // 비동기 병렬요청 처리

    // 이전 상태를 백업
    const previousProfileData = queryClient.getQueryData([
      queryKeys.counselorProfile,
    ]);
    const previousTimetableData = queryClient.getQueryData([
      queryKeys.timetable,
    ]);

    const profilePromise = profileMutation.mutateAsync(couselorProfile);

    const timetablePromise = timetableMutation.mutateAsync(timetable);

    try {
      const responses = await Promise.all([profilePromise, timetablePromise]);
      console.log('save success');
    } catch (e) {
      alert('일부 저장에 실패하였습니다. 다시 시도해주세요.');
      // 하나라도 실패한 경우 이전 상태로 복원 (rollback)
      /*
      queryClient.setQueryData(
        [queryKeys.counselorProfile],
        previousProfileData,
      );
      queryClient.setQueryData([queryKeys.timetable], previousTimetableData);
      */
    } finally {
      // refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.counselorProfile] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.timetable] });
    }
  };
  const handleOnClickBtn = () => {
    if (isEditMode) {
      // 데이터 저장 요청
      setIsEditMode(false);
      handlePararellMutate();
    } else {
      // 수정모드 진입
      setIsEditMode(true);
    }
  };
  const btnText = isEditMode
    ? '시간표 및 상담정보 적용하기'
    : '시간표 및 상담정보 수정하기';

  const btnBg = isEditMode ? 'bg-yellow-100' : 'bg-yellow-20';

  return (
    <button
      className={`w-[26rem] h-[4rem] ${btnBg} px-[3.9rem] py-[0.8rem]  rounded-lg
     cursor-pointer hover:outline hover:outline-1  hover:outline-yellow-120`}
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

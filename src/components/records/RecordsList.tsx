import { useEffect, useState } from 'react';

import SingleRecord from './SingleRecord';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { DUMMY_EMOTION_RECORDS } from '@/constants/DUMMY_DATA';

interface Props {
  clientId: string;
}

const RecordsList = ({ clientId }: Props) => {
  const [emotionRecordList, setEmotionRecordList] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchEmotionRecords();
  }, [clientId]);

  const fetchEmotionRecords = () => {
    // TODO - 감정기록 리스트 조회 API 연동 by {clientId}
    const { page, records } = DUMMY_EMOTION_RECORDS;
    setEmotionRecordList(records);

    setPage(page);
  };

  return (
    <div className="w-[102.5rem] bg-white rounded-[2rem]">
      {/* 페이지네이션 영역 */}
      <div className="w-full h-[6.8rem] flex items-center ml-[2.5rem]">
        <BsChevronLeft
          size={14}
          color={page === 1 ? '#DCDCDC' : '#737373'}
          cursor={'pointer'}
          onClick={() => setPage(page - 1)}
        />
        <span className="text-body1 text-gray-9 mx-[1.5rem]">{page}</span>
        <BsChevronRight
          size={14}
          color={
            page === Math.ceil(emotionRecordList.length / 7)
              ? '#737373'
              : '#DCDCDC'
          }
          cursor={'pointer'}
          onClick={() => setPage(page + 1)}
        />
      </div>
      {/* 감정기록 리스트 영역 */}
      <div>
        {emotionRecordList.map((record: any, idx: number) => {
          return (
            <div key={idx}>
              <SingleRecord record={record} idx={idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordsList;

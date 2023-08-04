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
  const [totalCount, setTotalCount] = useState<number>(14); // 전체 리스트 개수

  useEffect(() => {
    fetchEmotionRecords();
  }, [clientId]);

  const fetchEmotionRecords = () => {
    // TODO - 감정기록 리스트 조회 API 연동 by {clientId}
    const { page, totalCount, records } = DUMMY_EMOTION_RECORDS;
    setEmotionRecordList(records);

    setTotalCount(totalCount);
    setPage(page);
  };

  const handleLeftPageClick = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleRightPageClick = () => {
    if (page !== Math.ceil(totalCount / 7)) {
      setPage(page + 1);
    }
  };

  return (
    <div className="w-[102.5rem] bg-white rounded-[2rem]">
      {/* 페이지네이션 영역 */}
      <div className="w-full h-[6.8rem] flex items-center ml-[2.5rem]">
        <BsChevronLeft
          size={14}
          color={page === 1 ? '#DCDCDC' : '#737373'}
          cursor={'pointer'}
          onClick={handleLeftPageClick}
        />
        <span className="text-body1 text-gray-9 mx-[1.5rem]">{page}</span>
        <BsChevronRight
          size={14}
          color={page === Math.ceil(totalCount / 7) ? '#DCDCDC' : '#737373'}
          cursor={'pointer'}
          onClick={handleRightPageClick}
        />
      </div>
      {/* 감정기록 리스트 영역 */}
      <div>
        {emotionRecordList
          .slice((page - 1) * 7, page * 7)
          .map((record: any, idx: number) => {
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

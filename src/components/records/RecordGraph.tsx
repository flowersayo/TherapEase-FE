import { parseDateString } from '@/utils/parseDate';

import { IEmotion, IGraphRecord } from '@/interfaces/interfaces';

import { DUMMY_EMOTION_GRAPH_RECORDS } from '@/constants/DUMMY_DATA';

interface Props {
  clientId: string;
}

const RecordGraph = ({ clientId }: Props) => {
  return (
    <div className="w-[67.9rem] h-[28.5rem] bg-white rounded-[2rem] pt-[2.653rem] pb-[2.1rem] px-[2.5rem]">
      {/* 제목 영역 */}
      <div className="flex items-center">
        <span className="text-heading4 text-gray-9">지난 1주일의 통계</span>
        <div className="ml-auto flex items-center gap-[0.5rem] text-body4 text-gray-8">
          <div className="w-[1.4rem] h-[1.4rem] rounded-[0.4rem] bg-green-100"></div>
          <span className="mr-[0.5rem]">부정</span>
          <div className="w-[1.4rem] h-[1.4rem] rounded-[0.4rem] bg-blue-100"></div>
          <span className="mr-[0.5rem]">긍정</span>
          <div className="w-[1.4rem] h-[1.4rem] rounded-[0.4rem] bg-gray-100"></div>
          <span>모름</span>
        </div>
      </div>

      {/* 그래프 영역 */}
      <div className="h-[calc(100%-2.9rem)] flex justify-start items-end gap-[0.9rem]">
        {DUMMY_EMOTION_GRAPH_RECORDS.map((record: IGraphRecord) => {
          const date = parseDateString(record.date);
          const emotions = record.emotions;

          return (
            <div className="flex flex-col items-center gap-[1.5rem]">
              <div className="flex gap-[0.2rem]">
                {emotions.map((emotion: IEmotion) => {
                  const { mainEmotion, intensity, feeling } = emotion;

                  return (
                    <div className="flex flex-col-reverse gap-[0.2rem]">
                      <span className="text-label2 text-gray-9 text-center px-[0.4rem] py-[0.1rem] rounded-[0.4rem] bg-yellow-100">
                        {mainEmotion ?? '-'}
                      </span>

                      {Array(intensity)
                        .fill('')
                        .map((_, idx) => {
                          const color =
                            feeling === -1
                              ? 'green'
                              : feeling === 0
                              ? 'gray'
                              : 'blue';
                          const intensity = 20 * (idx + 1);

                          return (
                            <div
                              className={`w-[2.6rem] h-[2.6rem] rounded-[0.359rem]`}
                              style={{
                                backgroundColor: `var(--${color}-${intensity})`,
                              }}
                            ></div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
              <span className="text-body3 text-gray-9">{date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordGraph;

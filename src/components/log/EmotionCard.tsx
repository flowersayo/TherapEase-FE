import { TfiClose } from 'react-icons/tfi';

import { IEmotion } from '@/interfaces/interfaces';
import { DUMMY_LARGE_EMOTION, FEELING } from '@/constants/DUMMY_DATA';

const EmotionCard = ({
  emotion,
  onDelete,
}: {
  emotion: IEmotion;
  onDelete: (value: IEmotion) => void;
}) => {
  return (
    <div className="box-border w-[33.2rem] h-[13.8rem] pl-[3.8rem] pt-[1.7rem] pr-[2.1rem] pb-[2.7rem] bg-white rounded-[2rem] flex flex-col gap-[1.3rem] select-none">
      <div className="flex justify-between">
        <span className="text-body4 text-gray-8">오늘의 감정</span>
        <TfiClose
          size={15}
          color="#737373"
          cursor={'pointer'}
          onClick={() => onDelete(emotion)}
        />
      </div>

      <div className="flex items-center gap-[0.6rem]">
        <div className="flex flex-col gap-[0.1rem]">
          <span className="text-body2 text-gray-9">
            {
              DUMMY_LARGE_EMOTION.find(
                ({ value }) => value === emotion.mainEmotion,
              )?.labelShort
            }
          </span>
          <div className="w-full h-[0.1rem] bg-gray-4"></div>
        </div>
        <span className="text-body3 text-gray-7">이 느껴져서</span>
      </div>

      <div className="flex items-center">
        <div className="flex gap-[0.25rem] mr-[0.7rem]">
          {[20, 40, 60, 80, 100].map((val, idx) => {
            let color;
            switch (emotion.feeling) {
              case 1:
                color = 'blue';
                break;
              case -1:
                color = 'green';
                break;
              case 0:
                color = 'gray';
                break;
            }

            return (
              <div
                key={val}
                className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem]"
                style={{
                  backgroundColor:
                    idx + 1 - emotion.intensity <= 0
                      ? `var(--${color}-${val})`
                      : '#F7F7F7',
                }}
              ></div>
            );
          })}
        </div>
        <span className="text-body3 text-gray-7">만큼</span>
        <div className="flex flex-col gap-[0.1rem] ml-[0.9rem]">
          <span className="text-body2 text-gray-9">
            {FEELING.find(({ value }) => value === emotion.feeling)?.label}
          </span>
          <div className="w-full h-[0.1rem] bg-gray-4"></div>
        </div>
      </div>
    </div>
  );
};

export default EmotionCard;

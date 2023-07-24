import { useEffect } from 'react';
import Image from 'next/image';

import positiveIcon from '../../assets/log/positive-icon.svg';
import negativeIcon from '../../assets/log/negative-icon.svg';
import noideaIcon from '../../assets/log/noidea-icon.svg';

interface EmotionSelectCardProps {
  emotionList: { value: string; label: string }[] | undefined;
  selectedEmotion?: { value: string; label: string } | null;
  // setSelectedEmotion?: ({ value: string; label: string }) => void;
  setSelectedEmotion?: any; // TODO - 타입 해결
}

interface SingleEmotionCardProps {
  text: string;
  isSelected?: boolean;
}

interface FeelingCardProps {
  selectedFeeling: number | null;
  setSelectedFeeling: (value: number | null) => void;
  selectedFeelingIntensity: number;
  setSelectedFeelingIntensity: (value: number) => void;
}

//
// 감정 대분류, 중분류 카드 // TODO - 네이밍 명확히 변경
//
export const EmotionSelectCard = ({
  emotionList,
  selectedEmotion,
  setSelectedEmotion,
}: EmotionSelectCardProps) => {
  return (
    <div className="w-[33.2rem] h-fit bg-white px-[1.2rem] py-[1rem] rounded-[2rem] flex flex-wrap gap-[0.8rem]">
      {emotionList?.map((emotion, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              selectedEmotion === emotion
                ? setSelectedEmotion(null)
                : setSelectedEmotion(emotion);
            }}
          >
            <SingleEmotionCard
              text={emotion.label}
              isSelected={selectedEmotion?.value === emotion.value}
            />
          </div>
        );
      })}
    </div>
  );
};

//
// 감정 대분류, 중분류 카드 disabled
//
export const EmotionSelectCardDisabled = ({ text }: { text: string }) => {
  return (
    <div className="w-[33.2rem] h-[29.1rem] text-body2 text-gray-5 bg-gray-3 rounded-[2rem] flex justify-center items-center select-none">
      {text}
    </div>
  );
};

//
// 감정 대분류, 중분류 카드 single
//
export const SingleEmotionCard = ({
  text,
  isSelected = false,
}: SingleEmotionCardProps) => {
  return (
    <span
      className={`w-[15rem] h-[8.5rem] flex justify-center items-center text-body1 border rounded-[2rem] cursor-pointer select-none ${
        isSelected
          ? 'text-gray-9 bg-yellow-100 border-yellow-120'
          : 'text-gray-7 bg-white border-gray-3 hover:bg-yellow-20 hover:border-yellow-100'
      }`}
    >
      {text}
    </span>
  );
};

//
// 긍부모 카드
//
export const FeelingCard = ({
  selectedFeeling,
  setSelectedFeeling,
  selectedFeelingIntensity,
  setSelectedFeelingIntensity,
}: FeelingCardProps) => {
  let color: string;
  switch (selectedFeeling) {
    case 1:
      color = 'blue';
      break;
    case -1:
      color = 'green';
      break;
    case 0:
      color = 'gray';
      break;
    default:
      color = 'gray';
      break;
  }

  useEffect(() => {
    setSelectedFeelingIntensity(0);
  }, [selectedFeeling]);

  const handleSingleFeelingCardClick = (feeling: number) => {
    if (selectedFeeling !== feeling) {
      setSelectedFeeling(feeling);
    } else {
      setSelectedFeeling(null);
    }
  };

  const handleFeelingNumberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedFeeling !== null) {
      setSelectedFeelingIntensity(Number(e.currentTarget.id));
    }
  };

  return (
    <div className="w-[33.2rem] h-[29.1rem] bg-white px-[1.1rem] pt-[1.12rem] rounded-[2rem] flex flex-col select-none">
      <div className="flex gap-[0.6rem]">
        <div onClick={() => handleSingleFeelingCardClick(1)}>
          <SingleFeelingCard
            icon={<Image src={positiveIcon} alt="긍정" sizes="54" />}
            text="좋았어요"
            isSelected={selectedFeeling === 1}
          />
        </div>
        <div onClick={() => handleSingleFeelingCardClick(-1)}>
          <SingleFeelingCard
            icon={<Image src={negativeIcon} alt="부정" sizes="54" />}
            text="싫었어요"
            isSelected={selectedFeeling === -1}
          />
        </div>
        <div onClick={() => handleSingleFeelingCardClick(0)}>
          <SingleFeelingCard
            icon={<Image src={noideaIcon} alt="모르겠음" sizes="54" />}
            text="모르겠어요"
            isSelected={selectedFeeling === 0}
          />
        </div>
      </div>

      <span
        className={`text-body3 mt-[4.85rem] ml-[1.1rem] mb-[1.6rem] ${
          selectedFeeling === null ? 'text-gray-4' : 'text-gray-9'
        }`}
      >
        감정이 얼마나 강하게 느껴졌나요?
      </span>

      <div className="text-label1 text-gray-6 flex justify-center items-center gap-[0.8rem]">
        <span>약하게</span>
        <div className="flex gap-[.38rem]">
          {[20, 40, 60, 80, 100].map((intensity) => {
            const isSelected = selectedFeelingIntensity === intensity / 20;
            const isNotInRange =
              selectedFeelingIntensity &&
              selectedFeelingIntensity < intensity / 20;

            return (
              <div
                id={String(intensity / 20)}
                key={intensity}
                className={`w-[3.882rem] h-[3.882rem] border rounded-[0.863rem] cursor-pointer`}
                style={{
                  backgroundColor: isNotInRange
                    ? '#F7F7F7'
                    : `var(--${color}-${intensity})`,
                  borderColor: `${
                    isSelected ? `var(--${color}-120)` : 'transparent'
                  }`,
                }}
                onClick={handleFeelingNumberClick}
              ></div>
            );
          })}
        </div>
        <span>강하게</span>
      </div>
    </div>
  );
};

//
// 긍부모 카드 single
//
export const SingleFeelingCard = ({
  icon,
  text,
  isSelected = false,
}: {
  icon: React.ReactNode;
  text: string;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={`w-[10rem] h-[11.9rem] text-body2 border rounded-[2rem] flex flex-col justify-center items-center gap-[1.2rem] cursor-pointer select-none ${
        isSelected
          ? 'text-gray-9 bg-yellow-100 border-yellow-120'
          : 'text-gray-7 bg-white border-gray-3 hover:bg-yellow-20 hover:border-yellow-100'
      }`}
    >
      {icon}
      {text}
    </div>
  );
};

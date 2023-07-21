import Image from 'next/image';

import imgSrc from '../../assets/Emotion-log.png';

interface EmotionQuestionCardProps {
  content: React.ReactNode;
  isInProgress?: boolean;
}

export const EmotionQuestionCard = ({
  content,
  isInProgress = false,
}: EmotionQuestionCardProps) => {
  return (
    <div
      className={`relative box-border w-[36.5rem] h-fit mr-[-2rem] bg-white flex items-center rounded-[4rem] ${
        isInProgress ? 'shadow-shadow z-50' : null
      }`}
    >
      <div className="relative w-[7.4rem] h-[7.4rem]">
        <Image src={imgSrc} alt="log-question" fill={true} />
      </div>
      <div className="text-body3 text-gray-9 ml-[1.6rem]">{content}</div>
    </div>
  );
};

export const EmotionQuestionCardDisabled = ({
  content,
}: EmotionQuestionCardProps) => {
  return (
    <div
      className={`relative w-[36.5rem] h-[7.4rem] mr-[-2rem] bg-gray-2 flex justify-center items-center rounded-[4rem] shadow-[0.1rem_0_1rem_0_rgba(0,0,0,0.04)]`}
    >
      <div className="text-body3 text-gray-4">{content}</div>
    </div>
  );
};

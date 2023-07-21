import { AiOutlinePlusCircle } from 'react-icons/ai';

interface EmotionAddCardProps {
  isInProgress: boolean;
  setIsInProgress: (value: boolean) => void;
}

export const EmotionAddCard = ({
  isInProgress,
  setIsInProgress,
}: EmotionAddCardProps) => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => setIsInProgress(!isInProgress)}
    >
      {isInProgress ? (
        <div className="w-[33.2rem] h-[13.8rem] bg-yellow-20 border-2 border-solid border-yellow-120 rounded-[2rem] flex justify-center items-center">
          <span className="text-body2 text-yellow-120 mt-[0.2rem] select-none">
            오늘의 감정 생성 중
          </span>
        </div>
      ) : (
        <div className="w-[33.2rem] h-[13.8rem] bg-gray-2 border border-dashed border-gray-5 rounded-[2rem] flex justify-center items-center gap-[0.8rem]">
          <AiOutlinePlusCircle size={16} color="#737373" />
          <span className="text-body2 text-gray-8 mt-[0.2rem] select-none">
            오늘의 감정을 추가해주세요
          </span>
        </div>
      )}
    </div>
  );
};

export const EmotionAddCardDisabled = () => {
  return (
    <div className="w-[33.2rem] h-[13.8rem] bg-gray-2 border border-dashed rounded-[2rem] flex justify-center items-center gap-[0.8rem] border-gray-4">
      <AiOutlinePlusCircle size={16} color="#DCDCDC" />
      <span className="text-body2 text-gray-4 mt-[0.2rem] select-none">
        오늘의 감정을 추가해주세요
      </span>
    </div>
  );
};

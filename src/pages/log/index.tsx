import { useState, useEffect } from 'react';
import Link from 'next/link';

import { BsChevronDown, BsChevronUp } from 'react-icons/bs';


import {
  EmotionAddCard,
  EmotionAddCardDisabled,
} from '../../components/log/EmotionAddCard';
import {
  EmotionQuestionCard,
  EmotionQuestionCardDisabled,
} from '../../components/log/EmotionQuestionCard';
import {
  EmotionSelectCard,
  EmotionSelectCardDisabled,
  FeelingCard,
} from '@/components/log/EmotionSelectCard';
import EmotionCard from '@/components/log/EmotionCard';
import OptionalInput from '@/components/log/OptionalInput';
import { ButtonMedium } from '@/components/Buttons';

import { IEmotion } from '@/interfaces/interfaces';

import { EMOTION_QUESTIONS } from '../../constants/EMOTION_QUESTIONS';
import {
  DUMMY_LARGE_EMOTION,
  DUMMY_MEDIUM_EMOTION,
} from '@/constants/DUMMY_DATA';

const RecordsCreatePage = () => {
  const [emotionList, setEmotionList] = useState<IEmotion[]>([]); // 감정 리스트

  const [isInProgress, setIsInProgress] = useState(false); // 감정 생성 중 여부

  const [currentProcess, setCurrentProcess] = useState(0); // 감정 기록 단계 (0,1,2)

  const [selectedLargeEmotion, setSelectedLargeEmotion] = useState<{
    value: string;
    label: string;
  } | null>(null); // 선택된 감정 대분류

  const [selectedMediumEmotion, setSelectedMediumEmotion] = useState<{
    value: string;
    label: string;
  } | null>(null); // 선택된 감정 중분류

  const [selectedFeeling, setSelectedFeeling] = useState<number | null>(null); // 긍부모 감정

  const [selectedFeelingIntensity, setSelectedFeelingIntensity] =
    useState<number>(0); // 긍부모 감정 점수

  const [isOptionalInputsVisible, setIsOptionalInputVisible] =
    useState<boolean>(false);

  const [datailInputValue1, setDetailInputValue1] = useState<string>(''); // 선택 입력
  const [datailInputValue2, setDetailInputValue2] = useState<string>('');
  const [datailInputValue3, setDetailInputValue3] = useState<string>('');

  useEffect(() => {
    setSelectedMediumEmotion(null);

    // 감정 선택값에 따라 setCurrentProcess
    if (selectedLargeEmotion === null) {
      setCurrentProcess(0);
    } else {
      setCurrentProcess(1);
    }
  }, [selectedLargeEmotion]);

  useEffect(() => {
    // 감정 선택값에 따라 setCurrentProcess
    if (selectedLargeEmotion !== null && selectedMediumEmotion === null) {
      setCurrentProcess(1);
    } else if (
      selectedLargeEmotion !== null &&
      selectedMediumEmotion !== null
    ) {
      setCurrentProcess(2);
    }
  }, [selectedMediumEmotion]);

  // TODO - 이름 명확히 수정
  const handleSubmitEmotion = () => {
    const newEmotion: IEmotion = {
      mainEmotion: selectedLargeEmotion?.value ?? '',
      subEmotion: selectedMediumEmotion?.value ?? '',
      feeling: selectedFeeling ?? 100,
      intensity: selectedFeelingIntensity,
    };

    setEmotionList([...emotionList, newEmotion]);

    // 초기화
    setCurrentProcess(0);
    setSelectedLargeEmotion(null);
    setSelectedMediumEmotion(null);
    setSelectedFeeling(null);
    setSelectedFeelingIntensity(0);

    setIsInProgress(false);
  };

  const handleDeleteEmotionCard = (emotion: IEmotion) => {
    const newEmotionList = emotionList.filter((item) => item !== emotion);

    setEmotionList(newEmotionList);
  };

  // TODO - 이름 명확히 수정
  const handleSubmitEmotionLog = () => {
    // TODO - 감정 세부 기록 post api 연동
    console.log({
      emotions: emotionList,
      details1: datailInputValue1,
      details2: datailInputValue2,
      details3: datailInputValue3,
    });
  };

  return (
    <div className="w-[calc(100%-20.6rem)] h-full mx-auto py-[5.953rem]">
      {/* 페이지 헤더 영역 */}
      <div className="flex flex-col ml-[24px]">
        <span className="text-heading2 text-gray-9">감정 기록하기</span>
        <span className="text-body3 text-gray-7">
          오늘 하루 느꼈던 감정에 대해 기록해주세요.
        </span>
        <span className="text-body3 text-gray-7">
          해당 기록은 상담사가 읽고 다음 상담에 활용될 수 있습니다.
        </span>
      </div>
      {/* 감정 카드 영역 */}
      <div className="mt-[2.3rem] flex justify-center gap-[1.6rem]">
        {emotionList.map((emotion: IEmotion, idx: number) => {
          return (
            <EmotionCard
              key={idx}
              emotion={emotion}
              onDelete={handleDeleteEmotionCard}
            />
          );
        })}

        {[0, 1, 2].map((_, idx) => {
          if (emotionList.length === idx) {
            return (
              <EmotionAddCard
                key={idx}
                isInProgress={isInProgress}
                setIsInProgress={setIsInProgress}
              />
            );
          } else if (emotionList.length <= idx) {
            return <EmotionAddCardDisabled key={idx} />;
          }
        })}
      </div>
      {isInProgress && (
        <>
          {/* 감정 기록 질문 */}
          <div className="flex justify-center mt-[4.6rem] mb-[2.6rem] mr-[2rem]">
            {EMOTION_QUESTIONS.map((q, idx) => {
              return (
                <div key={idx}>
                  {currentProcess >= idx ? (
                    <EmotionQuestionCard
                      content={q}
                      isInProgress={currentProcess === idx}
                    />
                  ) : (
                    <EmotionQuestionCardDisabled content={q} />
                  )}
                </div>
              );
            })}
          </div>

          {/* 감정 선택 카드 */}
          <div className="flex justify-center gap-[1.6rem]">
            <EmotionSelectCard
              emotionList={DUMMY_LARGE_EMOTION}
              selectedEmotion={selectedLargeEmotion}
              setSelectedEmotion={setSelectedLargeEmotion}
            />

            {selectedLargeEmotion ? (
              <EmotionSelectCard
                emotionList={
                  DUMMY_MEDIUM_EMOTION.find(
                    ({ large }) => large === selectedLargeEmotion.value,
                  )?.medium
                }
                selectedEmotion={selectedMediumEmotion}
                setSelectedEmotion={setSelectedMediumEmotion}
              />
            ) : (
              <EmotionSelectCardDisabled text="왼쪽 감정 카드를 먼저 골라주세요!" />
            )}

            {selectedLargeEmotion && selectedMediumEmotion ? (
              <FeelingCard
                selectedFeeling={selectedFeeling}
                setSelectedFeeling={setSelectedFeeling}
                selectedFeelingIntensity={selectedFeelingIntensity}
                setSelectedFeelingIntensity={setSelectedFeelingIntensity}
              />
            ) : selectedLargeEmotion ? (
              <EmotionSelectCardDisabled text="왼쪽 세부 감정 카드를 먼저 골라주세요!" />
            ) : (
              <EmotionSelectCardDisabled text="왼쪽 감정 카드를 먼저 골라주세요!" />
            )}
          </div>

          <div className="flex justify-center items-center mt-[4.6rem]">
            <ButtonMedium
              text="감정 기록하기"
              onClick={handleSubmitEmotion}
              disabled={selectedFeelingIntensity === 0}
            />
          </div>
        </>
      )}

      {!isInProgress && emotionList.length !== 0 && (
        <>
          <div
            className="flex w-fit px-[3rem] py-[1rem] mx-auto mt-[4.1rem] justify-center items-center bg-gray-9 rounded-[2rem] cursor-pointer select-none transition ease-in-out hover:-translate-y-1"
            onClick={() => {
              setIsOptionalInputVisible(!isOptionalInputsVisible);
            }}
          >
            <span className="text-body2 text-gray-1 mr-[0.8rem]">
              더 하고 싶은 이야기가 있나요?
            </span>
            <span className="text-label1 text-yellow-100 mr-[0.3rem]">
              추가 질문 보기
            </span>
            {isOptionalInputsVisible ? (
              <BsChevronUp size={12} color="#FDF2B4" />
            ) : (
              <BsChevronDown size={12} color="#FDF2B4" />
            )}
          </div>

          {/* 선택 입력 영역 // TODO - 레이아웃 덕지덕지 고치기 */}
          {isOptionalInputsVisible && (
            <div className="w-[calc(100vw+20.6rem)] flex flex-col items-center gap-[14.8rem] bg-gray-3 pt-[5.8rem] pb-[8.55rem] pr-[20.6rem] mt-[2.1rem] ml-[-10.3rem]">
              <OptionalInput
                question={<span>어떤 상황이었나요?</span>}
                inputValue={datailInputValue1}
                setInputValue={setDetailInputValue1}
              />
              <OptionalInput
                question={<span>어떤 생각을 했나요?</span>}
                inputValue={datailInputValue2}
                setInputValue={setDetailInputValue2}
              />
              <OptionalInput
                question={
                  <>
                    <div>부정적인 감정이 있었다면,</div>
                    <div>어떤 방식으로 감정을 다스렸나요?</div>
                  </>
                }
                inputValue={datailInputValue3}
                setInputValue={setDetailInputValue3}
              />
            </div>
          )}

          <Link
            className="flex w-fit mx-auto mt-[20rem]"
            href={{ pathname: '/records' }}
            as={'/home'}
          >
            <ButtonMedium
              text="감정 기록 끝내기"
              onClick={handleSubmitEmotionLog}
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default RecordsCreatePage;

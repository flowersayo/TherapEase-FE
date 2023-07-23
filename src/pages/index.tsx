// Landing Page
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ButtonLarge } from '@/components/Buttons';
import MainIllustrationSrc from '../assets/images/main-illustration.svg';
import MetalCareIncreaseSrc from '../assets/images/mentalcare-increase.svg';
import TransparentLogoSrc from '../assets/icons/transparent-logo.svg';
import CounseleeManagementSrc from '../assets/images/counselee-management.svg';
import EmotionGraphSrc from '../assets/images/emtion-graph.svg';
import EmotionCreateSrc from '../assets/images/emotion-create.svg';
import TimeTableSrc from '../assets/images/timetable.svg';
import LoginModal from '@/components/modals/LoginModal';

const LandingPage = () => {
  const bacgkroundRef = useRef<HTMLDivElement | null>(null);
  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const theTherapistRef = useRef<HTMLDivElement | null>(null);
  const theClientRef = useRef<HTMLImageElement | null>(null);
  const startBtnRef = useRef<HTMLImageElement | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const observeList = [
    bacgkroundRef,
    aboutUsRef,
    theTherapistRef,
    theClientRef,
    startBtnRef,
  ];

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target: HTMLElement = entry.target as HTMLElement;

        const targetName = target.dataset.name; // data-name 값을 가져옴

        switch (targetName) {
          case 'background':
            if (entry.isIntersecting) {
              entry.target.classList.add('animate__fadeIn');
            } else {
              entry.target.classList.remove('animate__fadeIn');
            }
            break;
          case 'about-us':
            if (entry.isIntersecting) {
              // entry.target.classList.add('animate__fadeIn');
              const children = entry.target.children;

              const iconElement = children[0] as HTMLElement;
              const titleElement = children[1] as HTMLElement;
              const textElement = children[2] as HTMLElement;

              iconElement.classList.add('animate__fadeIn');
              titleElement.classList.add('animate__fadeIn');
              textElement.classList.add('animate__fadeIn');
            } else {
              const children = entry.target.children;

              const iconElement = children[0] as HTMLElement;
              const titleElement = children[1] as HTMLElement;
              const textElement = children[2] as HTMLElement;

              iconElement.classList.remove('animate__fadeIn');
              titleElement.classList.remove('animate__fadeIn');
              textElement.classList.remove('animate__fadeIn');
            }
            break;

          case 'the-therapist':
          case 'the-client':
            if (entry.isIntersecting) {
              // entry.target.classList.add('animate__fadeIn');
              const children = entry.target.children;

              const imageGroupElement = children[2] as HTMLElement;

              const leftImg = imageGroupElement.children[0] as HTMLElement;
              const rightImg = imageGroupElement.children[1] as HTMLElement;

              leftImg.classList.add('animate__fadeInLeft');
              rightImg.classList.add('animate__fadeInRight');
            } else {
              const children = entry.target.children;

              const imageGroupElement = children[2] as HTMLElement;

              const leftImg = imageGroupElement.children[0];
              const rightImg = imageGroupElement.children[1];

              leftImg.classList.remove('animate__fadeInLeft');
              rightImg.classList.remove('animate__fadeInRight');
            }
            break;
          case 'start-btn':
            if (entry.isIntersecting) {
              entry.target.classList.add('animate__fadeInDown');
            } else {
              entry.target.classList.remove('animate__fadeInDown');
            }
            break;
        }
      });
    }, options);

    observeList.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 종료
    };
  }, []);

  return (
    <div className="relative w-full">
      {
        /*코드입력모달*/ isLoginModalOpen && (
          <LoginModal closeModal={() => setIsLoginModalOpen(false)} />
        )
      }
      <div className="w-full min-w-[100rem] h-[87.7rem] bg-[#252525] flex justify-center items-center">
        <div
          className="flex flex-row items-center mr-[-5%] wow fadeIn"
          data-wow-duration="2s"
        >
          <div className="h-[35.6rem] flex flex-col gap-[5.7rem] ">
            <div className="flex flex-col gap-[0.8rem] ">
              <p className="font-logo text-title text-white">
                Make your <br /> counseling perfect <br />
                with TherapEase
              </p>
              <p className="text-landingPageBody3 text-white">
                테라피즈와 함께 효과적인 상담을 진행하세요.
              </p>
            </div>
            <ButtonLarge
              text={'지금 시작하기'}
              onClick={() => setIsLoginModalOpen(true)}
              disabled={false}
            />
          </div>

          <Image
            src={MainIllustrationSrc}
            alt="TherapEase-main-illustration"
            width={873}
            height={791}
          />
        </div>
      </div>
      <div
        className="w-full h-[63.8rem] bg-gray-9 flex
       justify-center items-center"
      >
        <div
          className="flex flex-col gap-[2.98rem] animate__animated"
          ref={bacgkroundRef}
          data-name={'background'}
        >
          <span className="font-logo text-landingPageTitle text-white">
            Background
          </span>
          <p className="text-landingPageBody3 text-white">
            대면 심리 상담이 대중화되어가고 있지만, 상담사들의 업무 프로세스를
            도와주는 서비스는 많이 없습니다. 이에 TherapEase는
            <br /> 심리 상담 업무 전반을 아날로그에서 디지털로 옮기고자 합니다.
          </p>
          <Image src={MetalCareIncreaseSrc} alt="metalcare-increase" />
        </div>
      </div>
      <div
        ref={aboutUsRef}
        data-name={'about-us'}
        className="w-full h-[36.8rem] bg-gray-9 flex flex-col
       justify-center items-center gap-[1.8rem] animate__animated "
      >
        <Image
          className="animate__animated"
          src={TransparentLogoSrc}
          alt="metalcare-increase"
        />
        <span className="font-logo text-landingPageTitle text-yellow-100 animate__animated">
          About us
        </span>
        <p className="text-landingPageBody2 text-yellow-100 text-center animate__animated">
          테라피즈는 상담사의 업무 효율을 증진시키기 위한 서비스입니다. 저희는
          상담사와 <br /> 내담자 모두에게 더 나은 심리상담환경을 조성하고자
          합니다.
        </p>
      </div>
      <div
        ref={theTherapistRef}
        data-name="the-therapist"
        className="w-full h-[97.6rem] bg-gray-3 flex flex-col
       justify-start items-center gap-[1.8rem] pt-[12rem]"
      >
        <span className="font-logo text-landingPageTitle text-gray-9">
          The Therapist
        </span>
        <p className="text-landingPageBody1 text-gray-9 text-center">
          상담사는 내담자의 감정기록표를 통해 <br />
          내담자를 지속적으로 모니터링하며 케어할 수 있어요.
        </p>
        <div className="flex gap-[1.6rem]">
          <Image
            className="animate__animated"
            src={CounseleeManagementSrc}
            alt="CounseleeManagementSrc"
          />
          <Image
            className="animate__animated"
            src={EmotionGraphSrc}
            alt="EmotionGraphSrc"
          />
        </div>
      </div>
      <div
        className="w-full h-[97.6rem] bg-[#FDF2B4] flex flex-col
       justify-start items-center gap-[1.8rem] pt-[12rem]
       "
        ref={theClientRef}
        data-name="the-client"
      >
        {' '}
        <span className="font-logo text-landingPageTitle text-gray-9">
          The Client
        </span>
        <p className="text-landingPageBody1 text-gray-9 text-center">
          내담자는 감정기록표를 통해 자신을 돌아보며, <br />
          상담시간표로 일정을 손쉽게 조율해요.
        </p>
        <div className="flex gap-[1.6rem]">
          <Image
            className="animate__animated"
            src={EmotionCreateSrc}
            alt="EmotionCreateSrc"
          />
          <Image
            className="animate__animated"
            src={TimeTableSrc}
            alt="TimeTableSrc"
          />
        </div>
      </div>
      <div
        className="w-full h-[27rem] bg-[#333333] flex flex-col
       justify-start items-center gap-[3.5rem] pt-[5.1rem]"
      >
        <span className="text-heading2 text-yellow-100">
          심리 상담, 테라피즈로 시작해보세요.
        </span>
        <div
          ref={startBtnRef}
          data-name="start-btn"
          className="animate__animated"
        >
          <ButtonLarge
            text={'지금 시작하기'}
            onClick={() => setIsLoginModalOpen(true)}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

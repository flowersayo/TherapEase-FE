import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useRecoilValue } from 'recoil';
import { isSignedInState, isCounselorState } from '@/store/user';

import LogoImage from '../assets/Header-logo.png';

const Header = () => {
  const router = useRouter();

  const isSignedIn = useRecoilValue<boolean>(isSignedInState); // 로그인 여부
  const isCounselor = useRecoilValue<boolean | null>(isCounselorState); // 상담자,내담자 여부

  const [visibleLogout, setVisibleLogout] = useState<boolean>(false); // 로그아웃 버튼 표시 여부

  const BUTTON_STYLE = `h-fit text-body2 select-none`;

  const rightMenus: React.ReactNode[] = isSignedIn
    ? (isCounselor
        ? [
            <Link
              href={{
                pathname: '/home',
              }}
              className={`${BUTTON_STYLE} ${
                router.pathname === '/clients' || router.pathname === '/records'
                  ? 'text-gray-9'
                  : 'text-gray-4'
              }`}
            >
              내담자 관리
            </Link>,
          ]
        : [
            <Link
              href={{
                pathname: '/home',
              }}
              className={`${BUTTON_STYLE} ${
                router.pathname === '/records' || router.pathname === '/log'
                  ? 'text-gray-9'
                  : 'text-gray-4'
              }`}
            >
              감정 기록
            </Link>,
          ]
      ).concat([
        <Link
          href={{
            pathname: '/timetable',
          }}
          className={`${BUTTON_STYLE} ${
            router.pathname === '/timetable' ? 'text-gray-9' : 'text-gray-4'
          }`}
        >
          상담일정표
        </Link>,
        <div className="relative">
          <span
            className={`${BUTTON_STYLE} cursor-pointer text-gray-4 p-[10px] rounded-[8px] ${
              visibleLogout && 'bg-gray-2'
            }`}
            onClick={() => {
              setVisibleLogout(!visibleLogout);
            }}
          >{`USER_NAME`}</span>
          {visibleLogout && (
            <div
              className="absolute top-[36px] left-[1px] py-[10px] px-[16px] text-label1 text-gray-6 bg-white border-solid border-[1px] border-gray-3 rounded-[4px] cursor-pointer select-none"
              onClick={() => console.log('로그아웃')}
            >
              로그아웃
            </div>
          )}
        </div>,
      ])
    : [
        <Link
          href={{
            pathname: '/', // TODO - 로그인모달창
          }}
          className={`${BUTTON_STYLE} text-gray-9`}
        >
          로그인 / 회원가입
        </Link>,
      ];

  useEffect(() => {
    setVisibleLogout(false);
  }, [router]);

  return (
    <div className="flex justify-between items-center w-screen h-[58.1px] bg-white shadow-shadow">
      <Link
        className="flex ml-[229.93px] gap-[9.68px]"
        href={{
          pathname: '/home',
        }}
      >
        <div className="relative w-[37.4px] h-[37.4px]">
          <Image
            src={LogoImage}
            alt="TherapEase Logo"
            fill={true}
            priority={true}
          />
        </div>
        <span className="h-fit font-logo text-[28.531px]">TherapEase</span>
      </Link>

      <div className="flex mr-[214.5px] gap-[36px]">
        {rightMenus?.map((menu: React.ReactNode, index: number) => {
          return <div key={index}>{menu}</div>;
        })}
      </div>
    </div>
  );
};

export default Header;

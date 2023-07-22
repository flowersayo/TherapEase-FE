import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import LoginModal from './modals/LoginModal';
import { getUser } from '@/hooks/useUser';
import { useRecoilValue } from 'recoil';
import { isSignedInState, isCounselorState } from '@/store/recoil';

import LogoImage from '../assets/Header-logo.png';
import { IUser } from '@/interfaces/interfaces';
import { clearUser } from '@/hooks/useUser';
import { useRecoilState } from 'recoil';

const Header = () => {
  const router = useRouter();
  const user: IUser = getUser();

  const [isCounselor, setIsCounselor] = useRecoilState<boolean | null>(
    isCounselorState,
  );
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(isSignedInState);

  const [visibleLogout, setVisibleLogout] = useState<boolean>(false); // 로그아웃 버튼 표시 여부

  const BUTTON_STYLE = `h-fit text-body2 select-none`;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOnClickLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleOnClickProfile = () => {
    setVisibleLogout((prev) => !prev);
  };

  const logout = () => {
    clearUser();

    setIsSignedIn(false);
    router.push('/');
  };
  const rightMenus: React.ReactNode[] = isSignedIn
    ? (isCounselor
        ? [
            <Link
              href={{
                pathname: '/clients',
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
                pathname: '/records',
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
            className={`${BUTTON_STYLE} cursor-pointer text-gray-4 p-[1.0rem] rounded-[.8rem] ${
              visibleLogout && 'bg-gray-2'
            }`}
            onClick={handleOnClickProfile}
          >
            {user?.name}
          </span>
          {visibleLogout && (
            <div
              className="absolute top-[3.6rem] left-[.1rem] py-[1.0rem] px-[1.6rem] text-label1 text-gray-6 bg-white border-solid border-[.1rem] border-gray-3 rounded-[.4rem] cursor-pointer select-none"
              onClick={logout}
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
          onClick={handleOnClickLogin}
        >
          로그인 / 회원가입
        </Link>,
      ];

  useEffect(() => {
    setVisibleLogout(false);
  }, [router]);

  return (
    <div className="fixed top-0 flex justify-between items-center w-screen h-[5.81rem] bg-white shadow-shadow z-10">
      {
        /*코드입력모달*/ isLoginModalOpen && (
          <LoginModal closeModal={() => setIsLoginModalOpen(false)} />
        )
      }

      <Link
        className="flex ml-[22.993rem] gap-[.968rem]"
        href={{
          pathname: '/home',
        }}
      >
        <div className="relative w-[3.74rem] h-[3.74rem]">
          <Image
            src={LogoImage}
            alt="TherapEase Logo"
            fill={true}
            priority={true}
          />
        </div>
        <span className="h-fit font-logo text-[2.8531rem]">TherapEase</span>
      </Link>

      <div className="flex mr-[21.45rem] gap-[3.6rem]">
        {rightMenus?.map((menu: React.ReactNode, index: number) => {
          return <div key={index}>{menu}</div>;
        })}
      </div>
    </div>
  );
};

export default Header;

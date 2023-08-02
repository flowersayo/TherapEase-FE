import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';

import LoginModal from './modals/LoginModal';
import LogoImage from '../assets/Header-logo.png';

import { userState } from '@/store/user';
import { getUser, useUser } from '@/hooks/useUser';
import { clearUser } from '@/hooks/useUser';
import { IUser } from '@/interfaces/interfaces';

import { UseQueryResult } from '@tanstack/react-query';

const Header = () => {
  const router = useRouter();

  const {
    data,
    isSuccess,
    isError,
    error,
  }: UseQueryResult<IUser | null, unknown> = useUser(); // 새로 고침시 로그인 유지

  const [user, setUser] = useRecoilState<IUser | null>(userState);
  const [visibleLogout, setVisibleLogout] = useState<boolean>(false); // 로그아웃 버튼 표시 여부
  const resetUserState = useResetRecoilState(userState);
  const BUTTON_STYLE = `h-fit text-body2 select-none`;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const counselor_id = !!user?.partnerId ? user.partnerId : user?.id; // 내담자라면 본인과 연동된 상담사 페이지로

  const handleOnClickLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleOnClickProfile = () => {
    setVisibleLogout((prev) => !prev);
  };

  const logout = () => {
    clearUser();
    setUser(null);
    router.push('/');
  };

  const rightMenus: React.ReactNode[] = user
    ? (user.role === 'counselor'
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
            pathname: `/timetable/${counselor_id}`,
          }}
          className={`${BUTTON_STYLE} ${
            router.pathname === `/timetable/[id]`
              ? 'text-gray-9'
              : 'text-gray-4'
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
  }, [router.pathname]);

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

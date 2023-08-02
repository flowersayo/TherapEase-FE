import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import InputModal from './InputModal';

import useInput from '@/hooks/useInput';
import { login } from '@/hooks/queries/user';
import { IUser } from '@/interfaces/interfaces';
import { updateUser } from '@/hooks/useUser';
import { userState } from '@/store/user';
import { saveToken } from '@/hooks/useUser';

import { queryKeys } from '@/constants/queryKeys';
import { USER_LOCALSTORAGE_KEY } from '@/constants/constants';

import HTTP from '@/utils/HTTP';

interface LoginModalProps {
  closeModal: () => void;
}

export default function LoginModal({ closeModal }: LoginModalProps) {
  const [code, handleChangeCode] = useInput('');
  const router = useRouter();

  const [user, setUser] = useRecoilState<IUser | null>(userState);
  const handleOnSubmit = () => {
    // 입력값 검증 및 로그인 요청
    var body = { code: code as string };

    mutate(body);
  };

  const {
    data,
    isLoading,
    isSuccess,
    mutate,
  }: UseMutationResult<IUser, any, { code: string }> = useMutation(
    () => login({ code: code as string }),
    {
      onMutate: (variable) => {
        // variable : {code: 'xxx'}
      },
      onError: (error, variable, context) => {
        // error
      },
      onSuccess: (data: IUser, variables, context) => {
        console.log('login success', data, variables, context);
        closeModal();
        setUser(data); //user 전역상태 업데이트
        saveToken(data.access, data.refresh); // 새로 고침 시 로그인 상태 유지를 위함

        const accessToken = data.access;
        // axios instance header 업데이트
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        if (data.role === 'counselor') {
          router.push('/clients');
        } else {
          router.push('/records');
        }
      },
      onSettled: () => {},
    },
  );

  return (
    <InputModal
      onSubmit={handleOnSubmit}
      title="가입코드 입력"
      body="이메일로 전송드린 발급코드를 입력해 주세요."
      btnText="시작하기"
      placeholder="발급코드 입력"
      inputValue={code as string}
      onChangeValue={handleChangeCode}
      closeModal={closeModal}
    />
  );
}

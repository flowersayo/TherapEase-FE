import React, { useState } from 'react';
import InputModal from './InputModal';
import useInput from '@/hooks/useInput';
import { queryKeys } from '@/constants/queryKeys';
import { login } from '@/hooks/queries/user';
import { IUser } from '@/interfaces/interfaces';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { USER_LOCALSTORAGE_KEY } from '@/constants/constants';
import { useRouter } from 'next/router';
import { updateUser } from '@/hooks/useUser';
import { useRecoilState } from 'recoil';
import { isCounselorState, isSignedInState } from '@/store/user';

import { saveUser } from '@/hooks/useUser';
interface LoginModalProps {
  closeModal: () => void;
}

export default function LoginModal({ closeModal }: LoginModalProps) {
  const [code, handleChangeCode] = useInput('');
  const router = useRouter();
  const [isCounseleor, setIsCounselor] = useRecoilState(isCounselorState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);

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
        console.log('onMutate', variable);
        // variable : {code: 'xxx'}
      },
      onError: (error, variable, context) => {
        // error
        console.log(error);
      },
      onSuccess: (data: IUser, variables, context) => {
        console.log('login success', data, variables, context);
        // updateUser(data);
        closeModal();
        saveUser(data);

        setIsSignedIn(true);
        if (data.role === 'counselor') {
          setIsCounselor(true);
          router.push('/clients');
        } else {
          setIsCounselor(false);
          router.push('/records');
        }
      },
      onSettled: () => {
        console.log('end');
      },
    },
  );

  return (
    <InputModal
      onSubmit={handleOnSubmit}
      title="가입코드 입력"
      body="이메일로 전송드린 발급코드를 입력해 주세요."
      btnText="시작하기"
      inputValue={code as string}
      onChangeValue={handleChangeCode}
      closeModal={closeModal}
    />
  );
}

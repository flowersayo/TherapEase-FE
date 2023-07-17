import React, { useState } from 'react';
import DefaultProfileSrc from '../../assets/images/defatult-profilie.png';
import Image from 'next/image';
import ProfileData from '../../data/profile.json';
import useInput from '@/hooks/useInput';

export default function Profile({ editable }: { editable: boolean }) {
  const { name, contact, introduction } = ProfileData;

  return (
    <div
      className="w-[26rem] h-[44rem] flex flex-col justify-start rounded-2xl items-center bg-white
    pt-[1.6rem] px-[2.1rem]"
    >
      <Image
        src={DefaultProfileSrc}
        alt="TherapEase Logo"
        width={218}
        height={166}
        style={{ marginBottom: '1.4rem' }}
      />
      <span className="text-heading4 text-gray-9 self-start px-[1rem]">
        {name} 상담사
      </span>
      <div className="w-full flex flex-col gap-[9px] ">
        <ContactInputField text={contact} disabled={!editable} />
        <IntroductionInputField text={introduction} disabled={!editable} />
      </div>
    </div>
  );
}

const ContactInputField = ({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) => {
  const [contactValue, handleChangeContact] = useInput(text);
  const bgColor = disabled ? 'bg-white' : 'bg-gray-2';
  return (
    <input
      className={`h-[2.5rem] w-full text-body2 text-gray-8 rounded-[8px]
      self-start px-[1rem] ${bgColor} focus:outline-none`}
      onChange={handleChangeContact}
      value={contactValue}
      disabled={disabled}
    />
  );
};
const IntroductionInputField = ({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) => {
  const [introductionValue, handleChangeIntroductionValue] = useInput(text);
  const bgColor = disabled ? 'bg-white' : 'bg-gray-2';
  const characterCnt: number = (introductionValue as string).length;
  return (
    <div className="relative">
      <textarea
        className={`w-full h-[17.4rem] text-body3 text-gray-6 rounded-[8px] self-start p-[1rem] 
      align-start ${bgColor} resize-none focus:outline-none`}
        onChange={handleChangeIntroductionValue}
        value={introductionValue}
        disabled={disabled}
        maxLength={99}
      ></textarea>
      {!disabled && (
        <p className="absolute p-[1rem] bottom-0 right-0 text-body-4 text-gray-4">
          {characterCnt} / 100
        </p>
      )}
    </div>
  );
};

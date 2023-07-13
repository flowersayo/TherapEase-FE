import React from 'react';
import DefaultProfileSrc from '../../assets/images/defatult-profilie.png';
import Image from 'next/image';
import ProfileData from '../../data/profile.json';

export default function Profile() {
  const counselor_name = '김지영';
  const { contact, introduction } = ProfileData;

  return (
    <div
      className="w-[26rem] h-[44rem] flex flex-col justify-start rounded-2xl items-center bg-white
    py-[1.6rem] px-5"
    >
      <Image
        src={DefaultProfileSrc}
        alt="TherapEase Logo"
        width={218}
        height={166}
        style={{ marginBottom: '1.4rem' }}
      />

      <span className="text-heading4 text-gray-9 self-start">
        {counselor_name} 상담사
      </span>
      <span className="text-body2 text-gray-4">{contact}</span>
      <span className="text-body3 text-gray-4">{introduction}</span>
    </div>
  );
}

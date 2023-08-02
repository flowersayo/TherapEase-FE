import React, { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { ButtonLarge } from '../Buttons';
interface InputModalProps {
  onSubmit: () => void;
  title: string;
  body: string;
  inputValue: string;
  onChangeValue: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  btnText: string;
  closeModal: () => void;
  placeholder : string;
}
export default function InputModal({
  onSubmit,
  title,
  body,
  btnText,
  inputValue,
  onChangeValue,
  closeModal,
placeholder
}: InputModalProps) {


  return (
    <div
      className="fixed z-[10000] inset-0 w-screen h-full bg-[#0000004d] bg-opacity-75 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className=" flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative z-20 w-[62.5rem] h-[35.4rem] px-[12.8rem] py-[2.8rem] bg-white rounded-[2rem] flex flex-col items-center transition-all">
          <span className="text-heading3 text-black mb-[5.1rem]">{title}</span>
          <span className="text-body2 text-gray-9 mb-[2.4rem]">{body}</span>
          <input
            className={`w-[37rem] text-body1 font-medium  placeholder:text-gray-5 px-[2.1rem] py-[1.6rem] mb-[5.1rem] border-[.1rem] border-gray-3 rounded-[0.5rem] focus:outline-none`}
            value={inputValue}
            onChange={onChangeValue}
            placeholder={placeholder}
            spellCheck="false"
          />
          <ButtonLarge
            text={btnText}
            onClick={onSubmit}
            disabled={!inputValue.length}
          />
          <TfiClose
            className="absolute top-[3.2rem] right-[2.56rem]"
            size={20}
            cursor={'pointer'}
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
}

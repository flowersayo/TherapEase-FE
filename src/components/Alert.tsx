import { CSSProperties } from 'react';

interface Props {
  text: string;
}

const Alert = ({ text }: Props) => {
  return (
    <div className="fixed bottom-[13rem] left-2/4 translate-x-[-50%] flex">
      <div
        className={`text-gray-3 text-body3 bg-[#0000004d] px-[8.4rem] py-[0.6rem] rounded-[3rem]`}
      >
        {text}
      </div>
    </div>
  );
};

export default Alert;

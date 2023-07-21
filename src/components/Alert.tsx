import { CSSProperties } from 'react';

interface Props {
  text: string;
}

const Alert = ({ text }: Props) => {
  // const textHalfLength = 8.4 + 1.4 * (text.length / 2);
  // left-[calc(50vw-8.4rem)]

  return (
    <div className="absolute top-[calc(100vh-13rem)] left-[calc(50vw-22rem)] flex">
      <div
        className={` text-gray-3 text-body3 bg-[#0000004d] px-[8.4rem] py-[0.6rem] rounded-[3rem]`}
      >
        {text}
      </div>
    </div>
  );
};

export default Alert;

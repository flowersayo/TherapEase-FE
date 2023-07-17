import Image from 'next/image';
import LogoImage from '../assets/Error-logo.png';

const Custom404 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center pb-[10%] gap-[1.821rem]">
      <div className="relative w-[18.5rem] h-[19.5rem]">
        <Image
          src={LogoImage}
          alt="TherapEase Logo"
          fill={true}
          priority={true}
        />
      </div>
      <span className="text-body2 text-gray-5">
        앗! 페이지를 찾을 수 없습니다.
      </span>
    </div>
  );
};

export default Custom404;

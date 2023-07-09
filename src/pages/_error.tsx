import Image from 'next/image';
import LogoImage from '../assets/Error-logo.png';

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center pb-[10%] gap-[18.21px]">
      <div className="relative w-[185px] h-[195px]">
        <Image
          src={LogoImage}
          alt="TherapEase Logo"
          fill={true}
          priority={true}
        />
      </div>
      <span className="text-body2 text-gray-5">
        {statusCode
          ? statusCode === 404
            ? '앗! 페이지를 찾을 수 없습니다.'
            : `${statusCode} 서버 에러가 발생했습니다.` // TODO - 멘트 변경
          : '클라이언트 에러가 발생했습니다.'}
      </span>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

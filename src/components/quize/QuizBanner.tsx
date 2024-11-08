import Image from 'next/image';
import React from 'react';

interface QuizBannerProps {
  quiz?: {
    id: number;
    title: string;
  };
}

const QuizBanner: React.FC<QuizBannerProps> = ({ quiz }) => {
  if (!quiz) {
    return (
      <div className="relative bg-[#D3D3D3] w-full h-[300px] md:h-[400px] lg:h-[460px] shadow-lg overflow-hidden"></div>
    );
  }

  return (
    <div className="relative bg-[#D3D3D3] w-full h-[300px] shadow-lg overflow-hidden">
      {/* 배경 이미지 */}
      <div>
        <div className="absolute inset-0 flex justify-center">
          <Image
            src={`https://d2qf2amuam62ps.cloudfront.net/img/quiz${quiz.id}.svg`}
            width={1000}
            height={300}
            alt="Quiz"
            className="w-[1000px] h-[300px] object-cover"
          />
        </div>

        {/* 텍스트와 버튼 오버레이 */}
        {/* <div className="absolute left-[23.7%] top-1/2 transform -translate-y-1/2 translate-x-1/6 p-6 md:p-8 lg:p-10 flex flex-col text-left text-black z-10">
          <div className="text-lg md:text-2xl lg:text-3xl font-semibold mb-2">
            {quiz.title}
          </div>
          <div className="text-sm md:text-lg lg:text-xl font-semibold mb-4">
            내 경제지식은 몇등일까?
          </div>

          <button
            onClick={() =>
              window.open(
                'https://contents.premium.naver.com/vestpie/pieceofmoney',
                '_blank'
              )
            }
            className="w-[200px] md:w-[250px] lg:w-[300px] h-[40px] md:h-[50px] lg:h-[52px] bg-gradient-to-r from-[#713CE2] to-[#5200FF] text-white rounded-xl text-xs md:text-sm lg:text-base font-bold flex items-center justify-center gap-2 hover:from-[#5b2bc6] hover:to-[#3f00c1] p-2">
            첫달 무료로 공부하고 시험보기
            <Image src="/images/mypage/right.svg" alt="arrow" width={16} height={16} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default QuizBanner;

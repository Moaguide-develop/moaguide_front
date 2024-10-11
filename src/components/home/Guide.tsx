'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Guide = () => {
  const handleGuideClick = (url: string) => {
    window.open(url, '_blank');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,  // 자동 슬라이드 활성화
    autoplaySpeed: 3000,  // 3000ms = 3초마다 슬라이드
  };

  return (
    <div className="w-full sm:w-[65%] md:w-[70%] lg:w-full lg:max-w-[692px]">
      <Slider {...settings}>
        <div 
      className="mx-auto flex-1 rounded-[12px] h-[200px] sm:max-w-[692px] w-full sm:h-[290px] bg-[url('/images/home/guide.svg')] cursor-pointer" 
          onClick={() => handleGuideClick('https://contents.premium.naver.com/vestpie/pieceofmoney')}
        >
          <div className="text-white text-heading3 sm:text-heading1 mt-[76px] sm:mt-[117px] ml-5 md:ml-11">
            <div>투자 가이드로</div>
            <div>소액 투자 시작해보자!</div>
          </div>
          <div className="flex items-center gap-1 ml-5 md:ml-11 mt-5 cursor-pointer max-w-max">
            <div className="text-white text-body7 sm:text-body2">가이드 보러가기</div>
            <div>
              <img src="/images/home/guide_right.svg" alt="guide_right" />
            </div>
          </div>
        </div>

        <div 
          className="rounded-[12px] h-[200px] sm:h-[290px] bg-[url('/images/home/moaguide-main-event.png')] bg-cover cursor-pointer"
          onClick={() => handleGuideClick('https://contents.premium.naver.com/vestpie/pieceofmoney')}
        >
          <div className="text-white text-heading3 sm:text-heading1 mt-[70px] sm:mt-[117px] ml-5 md:ml-11">
            <div>모아가이드 오픈이벤트</div>
            <div>사용후기 남기고 사은품 받자!</div>
          </div>
          <div className="relative flex items-center gap-1 ml-5 md:ml-11 mt-4 cursor-pointer max-w-max z-10">
            <div className="bg-black bg-opacity-50 rounded-[10px] p-2 flex items-center gap-1">
              <div className="ml-[5px] text-white text-body7 sm:text-body2">참여하러 가기</div>
              <div>
                <img src="/images/home/guide_right.svg" alt="guide_right" />
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Guide;
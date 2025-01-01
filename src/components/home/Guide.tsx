'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { Swiper as SwiperClass } from 'swiper/types';
import QuizBanner from '../../app/quiz/(quiz)/QuizBanner';

const Guide = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 2;

  const handleGuideClick = () => {
    window.open('https://contents.premium.naver.com/vestpie/pieceofmoney', '_blank');
  };

  const handleEventClick = () => {
    window.open(
      'https://docs.google.com/forms/d/1sa512hYe_eRDBjq-maNHIeGiwbu--EPG3k_8zmR9e7M/edit?pli=1',
      '_blank'
    );
  };

  const handleStartQuiz = () => {
    router.push('/quiz/start');
  };

  return (
    <div className="w-full sm:w-[65%] md:w-[70%] lg:w-full lg:max-w-[692px] relative">
      <Swiper
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper2"
        onSlideChange={(swiper: SwiperClass) => setCurrentSlide(swiper.realIndex + 1)} // Swiper 타입 사용
      >
        {/* <SwiperSlide>
          <div
            className="relative rounded-[12px] h-[200px] sm:h-[290px] bg-[#D3D3D3] bg-[url('/images/home/moaguide-quiz-event.png')] md:bg-[url('/images/home/moaguide-main-quiz-event.png')] bg-cover max-md:bg-contain max-md:bg-no-repeat max-md:bg-right-top cursor-pointer"
            onClick={handleStartQuiz}>
            <div className="absolute top-[90px] text-black text-heading1 max-sm:text-title1 sm:top-[70px] ml-5 sm:ml-7 z-10">
              <div>제 1회 투자능력고사</div>
              <div>내 경제지식은 몇등?</div>
            </div>
            <div className="absolute top-[167px] flex items-center gap-1 ml-7 mt-4 cursor-pointer max-w-max z-10 max-sm:top-[135px] max-sm:ml-5">
              <div className="bg-white rounded-full flex items-center gap-3 sm:p-[5px] sm:gap-5">
                <div className="ml-[7px] text-black text-caption4 sm:text-body2">
                  시험보러 가기
                </div>
                <div>
                  <img
                    src="/images/home/item_right.svg"
                    alt="item_right"
                    className="w-[18px] h-[18px] sm:w-[30px] sm:h-[30px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <div 
            className="relative rounded-[12px] h-[200px] sm:h-[290px] bg-[url('/images/home/moaguide-main-event.png')] bg-cover cursor-pointer"
            onClick={handleEventClick} 
          >
            <div className="absolute top-[70px] sm:top-[120px] text-white text-heading3 sm:text-heading1 ml-5 md:ml-11">
              <div>모아가이드 오픈이벤트</div>
              <div>사용후기 남기고 사은품 받자!</div>
            </div>
            <div className="absolute top-[130px] sm:top-[200px] flex items-center gap-1 ml-5 md:ml-11 mt-4 cursor-pointer max-w-max z-10">
              <div className="bg-black bg-opacity-50 rounded-[10px] p-2 flex items-center gap-1">
                <div className="ml-[5px] text-white text-body7 sm:text-body2">참여하러 가기</div>
                <div>
                  <img src="/images/home/guide_right.svg" alt="guide_right" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> */}

        <SwiperSlide>
          <div
            className="relative mx-auto flex-1 rounded-[12px] h-[200px] sm:max-w-[692px] w-full sm:h-[290px] bg-[url('/images/home/guide.svg')] cursor-pointer"
            onClick={handleGuideClick}>
            <div className="absolute top-[80px] sm:top-[120px] text-white text-heading3 sm:text-heading1 ml-5 md:ml-11">
              <div>투자 가이드로</div>
              <div>소액 투자 시작해보자!</div>
            </div>
            <div className="absolute top-[130px] sm:top-[200px] flex items-center gap-1 ml-5 md:ml-11 mt-5 cursor-pointer max-w-max">
              <div className="text-white text-body7 sm:text-body2">가이드 보러가기</div>
              <div>
                <img src="/images/home/guide_right.svg" alt="guide_right" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* <div className="absolute bottom-2 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-body7 z-[9999]">
        {currentSlide}/{totalSlides}
      </div> */}
    </div>
  );
};

export default Guide;

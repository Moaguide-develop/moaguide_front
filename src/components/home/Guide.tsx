'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; 

const Guide = () => {
  const router = useRouter();

  const handleGuideClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleEventClick = () => {
    const accessToken = Cookies.get('access_token'); 

    if (accessToken) {
      window.open('https://docs.google.com/forms/d/1sa512hYe_eRDBjq-maNHIeGiwbu--EPG3k_8zmR9e7M/edit?pli=1', '_blank');
    } else {
      if (confirm('로그인 후 신청 가능합니다. 확인을 누르면 로그인 페이지로 이동합니다.')) {
        router.push('/sign');
      }
    }
  };

  return (
    <div className="w-full sm:w-[65%] md:w-[70%] lg:w-full lg:max-w-[692px]">
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
      >
        <SwiperSlide>
          <div 
            className="relative mx-auto flex-1 rounded-[12px] h-[200px] sm:max-w-[692px] w-full sm:h-[290px] bg-[url('/images/home/guide.svg')] cursor-pointer"
            onClick={() => handleGuideClick('https://contents.premium.naver.com/vestpie/pieceofmoney')}
          >
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
        <SwiperSlide>
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
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Guide;
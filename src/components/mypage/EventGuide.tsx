'use client';
import React from 'react';

const EventGuide = () => {
  const handleGuideClick = () => {
    window.open('https://contents.premium.naver.com/vestpie/pieceofmoney', '_blank');
  };

  return (
    <div 
      className="mx-auto flex-1 rounded-[12px] h-[200px] sm:max-w-[692px] w-full sm:h-[290px] mt-[10px] bg-[url('/images/home/moaguide-main-event.png')] cursor-pointer" 
      onClick={handleGuideClick}
    >
    <div className="text-white text-heading3 sm:text-heading1 mt-[70px] sm:mt-[117px] ml-5 md:ml-11">
      <div>모아가이드 오픈이벤트</div>
      <div>사용후기 남기고 사은품 받자!</div>
    </div>
    <div className="relative flex items-center gap-1 ml-5 md:ml-11 mt-4 cursor-pointer max-w-max z-10 mb-[30px]">
            <div className="bg-black bg-opacity-50 rounded-[10px] p-2 flex items-center gap-1">
              <div className="ml-[5px] text-white text-body7 sm:text-body2">참여하러 가기</div>
              <div>
                <img src="/images/home/guide_right.svg" alt="guide_right" />
              </div>
            </div>
          </div>
    </div>
  );
};

export default EventGuide;
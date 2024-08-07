'use client';
import React from 'react';

const Guide = () => {
  return (
    <div className="flex-1 rounded-[12px] max-w-[692px] w-full h-[290px] bg-[url('/images/home/guide.svg')] desk:min-w-[400px]">
      <div className="text-white text-heading1 mt-[117px] ml-11">
        <div>투자 가이드로</div>
        <div>소액 투자 시작해보자!</div>
      </div>
      <div className="flex items-center gap-1 ml-11 mt-5 cursor-pointer max-w-max">
        <div className="text-white text-body2">가이드 보러가기</div>
        <div>
          <img src="/images/home/guide_right.svg" alt="guide_right" />
        </div>
      </div>
    </div>
  );
};

export default Guide;

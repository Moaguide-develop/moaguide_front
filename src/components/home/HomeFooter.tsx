'use client';
import React from 'react';

const HomeFooter = () => {

  const handlePrivacyClick = () => {
    window.open('https://empty-meteor-4dd.notion.site/41a968cf570147c19920e014acce8ba5', '_blank');
  };

  const handleUseClick = () => {
    window.open('https://empty-meteor-4dd.notion.site/af1c37c79e944d85af61aaf15e5e760e', '_blank');
  };

  return (
    <div className="mt-[100px] sm:mt-[158px] bg-bg mx-auto w-full sm:block">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center py-[52px] w-[90%] lg:w-full mx-auto desk:max-w-[1000px]">
        {/* 왼쪽 */}
        <div className="flex flex-col gap-6">
          <div>
            <img src="/images/home/footer_logo.svg" alt="" />
          </div>
          <div className="text-heading4 text-gray500">(주)모아가이드</div>
          <div className="text-body2 text-gray400 flex flex-col gap-4">
            <div className='flex flex-col gap-4 sm:flex-row sm:gap-0'>
              <div>대표자 : 노상현</div>
              <div className='hidden sm:flex sm:px-2'> | </div>
              <div>주소 : 경기도 수원시 영통구 영통로 498</div>
            </div>
            <div className='flex flex-col gap-4 sm:flex-row sm:gap-0'>
              <div>번호 : 010-2247-6408</div>
              <div className='hidden sm:flex sm:px-2'> | </div>
              <div>이메일 : ssang2247@moaguide.com</div>
            </div>
            <div>사업자등록 번호 : 890-19-01893</div>
            <div>통신판매업 번호 : 2024-수원영통-1533</div>
          </div>
          <div className="hidden sm:flex mt-10 text-[16px] font-normal text-gray700 ">
            Copyright © 2024. MOA GUIDE. All Rights Reserved.
          </div>
        </div>

        {/* 오른쪽 */}
        <div className=''>
          <div className="w-[202.34px] my-8 sm:w-full sm:my-0 cursor-pointer flex gap-0 mr-auto sm:mx-auto justify-center px-[7px] md:px-[28px] md:gap-2 py-4 bg-white border border-gray200 rounded-[12px]">
            <div className="text-body5 text-gray400">카카오톡으로 1:1 문의</div>
            <div>
              <img src="/images/home/footer_right.svg" alt="" className='ml-2 sm:ml-0'/>
            </div>
          </div>
          <div className="hidden sm:flex flex-col md:flex-row gap-3 text-body1 text-gray300 mt-0 sm:mt-[165px]">
            <div className="cursor-pointer" onClick={handlePrivacyClick}>개인정보처리방침</div>
            <div className="hidden md:block">|</div>
            <div className="cursor-pointer" onClick={handleUseClick}>이용약관</div>
          </div>
          <div className="flex sm:hidden flex-row md:flex-row gap-3 text-body1 text-gray300">
            <div className="cursor-pointer" onClick={handlePrivacyClick}>개인정보처리방침</div>
            <div className="">|</div>
            <div className="cursor-pointer" onClick={handleUseClick}>이용약관</div>
          </div>

          <div className="flex sm:hidden mt-8 text-[16px] font-normal text-gray700 ">
            Copyright © 2024. MOA GUIDE. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;

'use client';
import React from 'react';

const HomeFooter = () => {
  return (
    <div className="mt-[158px] bg-bg mx-auto w-full sm:block">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center py-[52px] w-[90%] lg:w-full mx-auto desk:max-w-[1000px]">
        {/* 왼쪽 */}
        <div className="flex flex-col gap-6">
          <div>
            <img src="/images/home/footer_logo.svg" alt="" />
          </div>
          <div className="text-heading4 text-gray500">(주)모아가이드</div>
          <div className="text-body2 text-gray400 flex flex-col gap-4">
            <div>대표자 : 홍길동 | 주소 : 서울특별시 강남구 테헤란로 10길, 동성빌딩</div>
            <div>번호 : 010-1234-1234 | 이메일 : Moaguide@gmail.com</div>
            <div>사업자등록번호 : 0000-00-00000</div>
            <div>통신판매업 번호 : 0000-0000-0000</div>
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
            <div className="cursor-pointer">개인정보처리방침</div>
            <div className="hidden md:block">|</div>
            <div className="cursor-pointer">이용약관</div>
          </div>
          <div className="flex sm:hidden flex-row md:flex-row gap-3 text-body1 text-gray300">
            <div className="cursor-pointer">개인정보처리방침</div>
            <div className="hidden md:block">|</div>
            <div className="cursor-pointer">이용약관</div>
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

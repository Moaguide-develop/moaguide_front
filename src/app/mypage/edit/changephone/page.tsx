'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const ChangePhonePage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="max-w-[640px] w-full mx-auto">
        <div onClick={() => router.back()} className="py-[14px]">
          <img src="/images/mypage/left_password.svg" alt="" className="cursor-pointer" />
        </div>
      </div>
      <section className="max-w-[340px] w-full mx-auto mt-[76px]">
        <div className="text-heading3">
          <span className="text-normal">휴대폰 번호</span>를 인증해주세요
        </div>
        {/* 휴대폰 번호 입력 */}
        <div className="mt-10">
          <div className="text-body3">휴대폰 번호</div>
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="휴대폰 번호 입력"
              className="flex-1 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 "
            />
            <div className="ml-[6px] cursor-pointer px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2">
              인증 요청
            </div>
          </div>
        </div>
        {/* 인증번호 입력 */}
        <div className="mt-[28px]">
          <div className="text-body3">인증번호</div>
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="휴대폰 번호 입력"
              className="flex-1 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2 "
            />
            <div className="ml-[6px] cursor-pointer px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2">
              인증 완료
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-5 py-[14px] mt-[60px] w-full rounded-[12px] bg-gray100 text-heading4 text-gray400">
          변경 완료
        </div>
      </section>
    </div>
  );
};

export default ChangePhonePage;

'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PaymentIndex = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState('first');

  const handleClick = () => {
    //pay-Todo : 클릭할 시 로그인 여부 확인하고 로그인되어있으면 router이동, 안되면 로그인창
    router.push('/payment/check');
  };

  return (
    <div>
      {/* 뒤로가기 */}
      <div onClick={() => router.back()} className="py-[14px] cursor-pointer max-w-max">
        <img src="/images/payment/back.svg" alt="" />
      </div>
      {/* 상단 */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-heading2 text-normal">구독 시작하기</div>
        <div className="text-body2 text-gray400">구독 회원 혜택</div>
        <div className="bg-gray50 rounded-[12px] px-10 py-6 w-full flex flex-col gap-4">
          <div className="flex gap-4 text-body7 text-gray400">
            <img src="/images/payment/Check.svg" alt="" />
            {/* pay-Todo 결제할시 장점 문구 정해서 올리기 */}
            <div>플랜 구독 내용 노출란</div>
          </div>
          <div className="flex gap-4 text-body7 text-gray400">
            {' '}
            <img src="/images/payment/Check.svg" alt="" />
            {/* pay-Todo 결제할시 장점 문구 정해서 올리기 */}
            <div>플랜 구독 내용 노출란 플랜 구독 내용 노출란</div>
          </div>
          <div className="flex gap-4 text-body7 text-gray400">
            {' '}
            <img src="/images/payment/Check.svg" alt="" />
            {/* pay-Todo 결제할시 장점 문구 정해서 올리기 */}
            <div>플랜 구독 내용 노출란</div>
          </div>
        </div>
      </div>
      {/* 하단 */}
      <div className="flex flex-col items-center gap-3 mt-5">
        <div
          onClick={() => setIsActive('first')}
          className={`w-full rounded-[12px] px-[20px] py-[22px] flex items-center justify-between border-2 cursor-pointer
        ${isActive === 'first' ? 'border-normal' : 'border-gray100'}
        `}>
          <div className="text-heading4 text-normal">1개월 구독 + 1개월</div>
          <div className="flex flex-col gap-2 items-end">
            <div className="text-body7 text-gray300 line-through">₩ 10,000</div>
            <div className="text-heading4 ">₩ 9,900</div>
            <div className="text-body7 text-gray500">₩ 9,900/월</div>
          </div>
        </div>
        <div
          onClick={() => setIsActive('second')}
          className={`w-full rounded-[12px] px-[20px] py-[22px] flex items-center justify-between border-2 cursor-pointer
        ${isActive === 'second' ? 'border-normal' : 'border-gray100'}
        `}>
          <div className="text-heading4">
            3개월 구독 <span className="text-normal">+ 1개월</span>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="text-body7 text-gray300 line-through">₩ 30,000</div>
            <div className="text-heading4 ">₩ 18,000</div>
            <div className="text-body7 text-gray500">₩ 6,000/월</div>
          </div>
        </div>
        <div
          onClick={() => setIsActive('third')}
          className={`w-full rounded-[12px] px-[20px] py-[22px] flex items-center justify-between border-2 cursor-pointer
        ${isActive === 'third' ? 'border-normal' : 'border-gray100'}
        `}>
          <div className="text-heading4">
            6개월 구독 <span className="text-normal">+ 1개월</span>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="text-body7 text-gray300 line-through">₩ 60,000</div>
            <div className="text-heading4 ">₩ 18,000</div>
            <div className="text-body7 text-gray500">₩ 5,000/월</div>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div
        onClick={handleClick}
        className="cursor-pointer my-10 py-[18px] w-full rounded-[12px] flex items-center justify-center bg-gradient2 text-title1 text-white">
        첫 달 무료체험하기
      </div>
    </div>
  );
};

export default PaymentIndex;

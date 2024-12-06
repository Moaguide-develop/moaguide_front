'use client';
import { getCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PaymentPage = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState('first');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = getCookie('access_token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push('/payment/check');
    } else {
      router.push('/sign');
    }
  };

  return (
    <div className="px-5 pb-20 sm:px-0 sm:pb-0">
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

            <div>상품 상세정보 페이지 무제한 확인</div>
          </div>
          <div className="flex gap-4 text-body7 text-gray400">
            <img src="/images/payment/Check.svg" alt="" />
            <div>관심상품 저장 및 관리</div>
          </div>
          <div className="flex gap-4 text-body7 text-gray400">
            <img src="/images/payment/Check.svg" alt="" />
            <div>관심상품 변동, 공시, 뉴스 알림</div>
          </div>
          <div className="flex gap-4 text-body7 text-gray400">
            <img src="/images/payment/Check.svg" alt="" />
            <div>학습하기 콘텐츠 무제한 열람</div>
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
          <div className="flex flex-col gap-2">
            <div className="bg-error text-caption3 text-white rounded-[4px] max-w-max px-[6px] py-[4px]">
              Best
            </div>
            <div className="text-heading4">
              6개월 구독 <span className="text-normal">+ 1개월</span>
            </div>
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

export default PaymentPage;

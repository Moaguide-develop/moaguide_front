'use client';
import { useModalStore } from '@/store/modal.store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PaymentCheckIndex = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { setModalType, setOpen } = useModalStore();

  const handleClick = () => {
    if (!isChecked) return;
  };

  const handleCoupon = () => {
    setModalType('coupon');
    setOpen(true);
  };

  return (
    <div>
      {/* 뒤로가기 */}
      <div onClick={() => router.back()} className="py-[14px] cursor-pointer max-w-max">
        <img src="/images/payment/back.svg" alt="" />
      </div>
      <div className="my-3 text-heading3 ">결제하기</div>
      <div className="py-5 flex justify-between text-body2 border-b border-gray100">
        <div>구독 플랜</div>
        <div>
          1개월 구독 <span className="text-normal">+ 1개월</span>
        </div>
      </div>
      <div className="py-5 flex justify-between text-body2 border-b border-gray100">
        <div>결제 금액</div>
        <div>0원</div>
      </div>
      <div className="py-5 flex justify-between items-center text-body2 border-b border-gray100">
        <div>쿠폰 사용</div>
        <div
          onClick={handleCoupon}
          className="rounded-[12px] cursor-pointer p-3 flex items-center justify-center bg-black text-white text-body7">
          쿠폰 선택
        </div>
      </div>
      <div className="py-5 flex justify-between text-body2 border-b border-gray100">
        <div>최종 결제 금액</div>
        <div className="text-heading4 text-normal">0원</div>
      </div>
      <div className="flex items-center gap-2 py-5">
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            className="bg-normal"
          />
        </div>
        <div className="text-">거래 내용을 확인하였으며, 동의합니다</div>
      </div>
      <div
        onClick={handleClick}
        className={` my-10 py-[18px] w-full rounded-[12px] flex items-center justify-center text-title1
      ${isChecked ? 'cursor-pointer bg-gradient2 text-white' : 'bg-gray100 text-gray300'}
      `}>
        0원 결제하기
      </div>
    </div>
  );
};

export default PaymentCheckIndex;

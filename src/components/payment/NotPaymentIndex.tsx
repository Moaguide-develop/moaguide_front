'use client';
import { getCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Line } from '../common/Line';

const NotPaymentIndex = () => {
  const router = useRouter();

  return (
    <div className="px-5 pb-20 sm:px-0 sm:pb-0">
      {/* 뒤로가기 */}
      <div onClick={() => router.back()} className="py-[14px] cursor-pointer max-w-max">
        <img src="/images/payment/back.svg" alt="" />
      </div>
      <div className="text-xl mt-[10px] mb-[20px]">구독 관리</div>

      <div className="w-full max-w-[640px] px-[25px] py-[20px] flex items-center justify-between bg-gradient rounded-[8px] mb-[5px] text-white">
        <div>1개월 구독 이용중</div>
        <div>월 9,900원</div>
      </div>

      <div className=" w-full max-w-[640px] py-[16px] text-gray-400 border-[1px] border-gray-400 flex justify-center items-center rounded-[8px]">
        {' '}
        구독 해지
      </div>

      <div>
        <div className=" flex justify-between items-center py-[5px]">
          <div>구독 시작일</div>
          <div>2024.06.06</div>
        </div>
        <Line />
        <div className=" flex justify-between items-center py-[5px]">
          <div>구독 만료일</div>
          <div>2024.06.06</div>
        </div>
        <Line />
        <div className=" flex justify-between items-center py-[5px]">
          <div>다음 결제일</div>
          <div>2024.06.06</div>
        </div>
      </div>

      <Line mt={30} />

      <div className="text-xl mt-[10px]">결제 내역</div>

      <div className="flex flex-col mt-[10px]">
        <div className="flex justify-between ">
          <div> 1개월 구독</div>
          <div className="flex flex-col ">
            <div className="mb-[10px]">2025.06.06 결제</div>
            <div>9,900원</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[10px]">
        <div className="flex justify-between ">
          <div> 1개월 구독</div>
          <div className="flex flex-col ">
            <div className="mb-[10px]">2025.06.06 결제</div>
            <div>9,900원</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[10px]">
        <div className="flex justify-between ">
          <div> 1개월 구독</div>
          <div className="flex flex-col ">
            <div className="mb-[10px]">2025.06.06 결제</div>
            <div>9,900원</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotPaymentIndex;

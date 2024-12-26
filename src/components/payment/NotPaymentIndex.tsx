'use client';
import { getCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Line } from '../common/Line';
import { usePaymentCheck, usePaymentList } from '@/factory/Payment/paymentcheck';
import { formatDate } from '@/utils/FormatDate';

const NotPaymentIndex = () => {
  const { data, isLoading } = usePaymentCheck();
  const { data: paymentListData, isLoading: paymentListLoading } = usePaymentList();
  console.log(paymentListData);

  const router = useRouter();
  const startDate = data?.date.startDate;
  const endDate = data?.date.endDate;
  const nextPaymentDate = data?.date.paymentDate;

  const StartDate = startDate ? formatDate(startDate) : '';
  const EndDate = endDate ? formatDate(endDate) : '';
  const PaymentDate = nextPaymentDate ? formatDate(nextPaymentDate) : '';

  return (
    <div className="px-5 pb-20 sm:px-0 sm:pb-0">
      {/* 뒤로가기 */}
      <div onClick={() => router.back()} className="py-[14px] cursor-pointer max-w-max">
        <img src="/images/payment/back.svg" alt="" />
      </div>
      <div className="text-xl py-[20px]  font-bold">구독 관리</div>

      <div className="w-full max-w-[640px] px-[25px] py-[20px] flex items-center justify-between bg-gradient rounded-[12px] mb-[5px] text-white">
        <div>1개월 구독 이용중</div>
        <div>월 9,900원</div>
      </div>

      <div
        className=" w-full max-w-[640px] py-[8px] text-gray-400 border-[1px] mt-2 border-gray-300 flex justify-center items-center rounded-[12px] cursor-pointer"
        onClick={() => router.push('/mypage/payment/cancelsubscription')}>
        구독 해지
      </div>

      <div>
        <div className=" flex justify-between items-center py-[20px]">
          <div>구독 시작일</div>
          <div>{StartDate}</div>
        </div>
        <Line />
        <div className=" flex justify-between items-center py-[20px]">
          <div>구독 만료일</div>
          <div>{EndDate}</div>
        </div>
        <Line />
        <div className=" flex justify-between items-center py-[20px]">
          <div>다음 결제일</div>
          <div>{PaymentDate}</div>
        </div>
      </div>

      <div className={`mt-[30px]   w-atuo h-[2px] border border-[#c3c5c8] `} />

      <div className="text-xl mt-[40px] mb-[30px] font-bold">결제 내역</div>

      {paymentListData?.log.map((item, index) => {
        const PaymentAmount = item?.totalAmount;
        const PaymentDate = formatDate(item?.requestedAt);
        const OrderName = item?.orderName;
        return (
          <div key={item.id}>
            <div className="flex flex-col py-[20px]">
              <div className="flex justify-between ">
                <div className="text-gray-400">{OrderName}</div>
                <div className="flex flex-col ">
                  <div className="mb-[10px] text-gray-400">{PaymentDate} 결제</div>
                  <div className="flex justify-end">{PaymentAmount}원</div>
                </div>
              </div>
            </div>
            <Line />
          </div>
        );
      })}
    </div>
  );
};

export default NotPaymentIndex;

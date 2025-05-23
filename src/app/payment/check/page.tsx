'use client';
import { useModalStore } from '@/store/modal.store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import TossPaymentsCardWidget from '@/app/payment/(payment)/TossPaymentsCardWidget';
import { Line } from '@/components/common/Line';
import { getCoupon } from '@/factory/Coupon/getCoupon';
import Image from 'next/image';
import { useCheckCardRegister } from '@/factory/Card/CheckCardRegister';
import { SubscribedStatus } from '@/utils/subscribedStatus';

const PaymentCheckPage = () => {
  const { data } = getCoupon();
  const couponLength = data?.coupons?.length as number;
  const couponName = data?.coupons[0]?.couponName;

  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { setModalType, setOpen } = useModalStore();
  const { data: CheckCard, isLoading } = useCheckCardRegister();
  const { requestBillingAuth } = TossPaymentsCardWidget();
  const { Subscribestatus } = SubscribedStatus();

  console.log(Subscribestatus);
  const bililngRequest = () => {
    if (isChecked) {
      if (!CheckCard?.cardName) {
        requestBillingAuth();
      } else {
        router.push('/payment/check/confirm/successloading');
      }
    } else {
      null;
    }
  };
  return (
    <div className="px-5 pb-20 sm:px-0 sm:pb-0">
      {/* 뒤로가기 */}
      <div onClick={() => router.back()} className="py-[14px] cursor-pointer max-w-max">
        <img src="/images/payment/back.svg" alt="" />
      </div>
      <div className="my-3 text-heading3 ">결제하기</div>
      <div className="py-5 flex justify-between text-body2 border-b border-gray100">
        <div>구독 플랜</div>
        <div>1개월 구독</div>
      </div>
      <div className="py-5 flex justify-between text-body2 border-b border-gray100">
        <div>결제 금액</div>

        <div>4,900 원</div>
      </div>
      <div className="py-5 flex justify-between items-center text-body2 border-b border-gray100">
        <div>쿠폰 사용</div>
        {isLoading ? null : couponLength > 0 ? (
          <div className="rounded-[12px] cursor-pointer p-3 flex items-center justify-center bg-black text-white text-body7">
            {couponName}
          </div>
        ) : (
          <div>
            <div className="rounded-[12px] cursor-pointer px-3 py-1 flex items-center justify-center bg-black text-white text-xs  font-light">
              등록된 쿠폰이 없습니다.
            </div>
            <div
              className="flex justify-end text-sm mt-2 cursor-pointer"
              onClick={() => {
                router.push('/mypage/coupon');
              }}>
              쿠폰 등록하기{' '}
              <Image
                src={'/images/mypage/right.svg'}
                alt="leftarrow"
                width={20}
                height={20}
                className="ml-1"
              />
            </div>
          </div>
        )}
      </div>
      <div className="py-5 flex justify-between text-body2 border-b border-gray100">
        <div>최종 결제 금액</div>

        {isLoading ? null : couponLength > 0 ? (
          <div className="text-heading4 text-normal">0 원</div>
        ) : (
          <div className="text-heading4 text-normal">4,900 원</div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center ">
          <div className=" flex items-center gap-2  py-5">
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                className="subscribed_check cursor-pointer"
              />
            </div>
            <div
              onClick={() => setIsChecked((prev) => !prev)}
              className="text-body8 cursor-pointer">
              거래 내용을 확인하였으며, 동의합니다
            </div>
          </div>
          {Subscribestatus === 'unsubscribing' ? (
            <div className="text-body7 text-gray400  ">
              실 결제는 구독만료일에 결제 됩니다.
            </div>
          ) : null}
        </div>
      </div>

      {/* <TossPaymentsCardWidget /> */}
      <div
        onClick={() => {
          // isChecked && requestBillingAuth();
          bililngRequest();
        }}
        className={`payment_start my-10 py-[18px] w-full rounded-[12px] flex items-center justify-center text-title1
      ${isChecked ? 'cursor-pointer bg-gradient2 text-white' : 'bg-gray100 text-gray300'}
      `}>
        {couponLength > 0 ? <div> 0원 결제하기</div> : <div>4,900 원 결제하기</div>}
      </div>
    </div>
  );
};

export default PaymentCheckPage;

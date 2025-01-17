'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useModalStore } from '@/store/modal.store';
const CancelSubscriptionPage = () => {
  const router = useRouter();
  const [buttonTrigger, setButtonTrigger] = useState(false);
  const { setOpen, setModalType } = useModalStore();
  return (
    <div className="px-5 pb-20 sm:px-0 sm:pb-0">
      <div onClick={() => router.back()} className="pb-[14px] cursor-pointer max-w-max">
        <img src="/images/payment/back.svg" alt="" />
      </div>
      <div className="text-xl py-[20px]  font-bold">
        <span className="text-gradient">해지 전</span> 읽어주세요!
      </div>

      <div className="flex flex-col text-gray-500 mt-[20px]">
        <div>구독 후 7일 이내 구독 해지 시 전액 환불됩니다.</div>
        <div>7일 이후엔 환불이 불가하며 익월 결제일에 자동으로 구독이 해지됩니다.</div>
      </div>

      <div
        className={`flex max-w-[640px] h-[54px] px-[16px] py-[14px] rounded-[12px] mt-[15px]
         border-[1px] cursor-pointer ${buttonTrigger ? 'border-gradient' : 'border-gray-200'}`}
        onClick={() => setButtonTrigger(!buttonTrigger)}>
        {buttonTrigger ? (
          <Image
            src="/images/payment/CheckCircle.svg"
            alt="Check Image"
            width={30}
            height={30}
          />
        ) : (
          <Image
            src="/images/payment/NonCheckCircle.svg"
            alt="NonCheck Image"
            width={30}
            height={30}
          />
        )}

        <div className="ml-[5px]">확인하였으며, 동의합니다.</div>
      </div>

      <button
        disabled={!buttonTrigger}
        className={` max-w-[640px] w-full flex justify-center items-center py-[18px]   rounded-[12px]  mt-[50px] ${buttonTrigger ? 'bg-gradient text-white cursor-pointer' : 'bg-gray-200 text-gray-400 border-[1px] '} `}
        onClick={() => {
          setOpen(true);
          setModalType('cancelsubScription');
        }}>
        구독 해지하기
      </button>
    </div>
  );
};

export default CancelSubscriptionPage;

'use client';
import TossPaymentsCardRegister from '@/components/card/TossPaymentsCardRegister';
import { axiosInstance } from '@/service/axiosInstance';
import { useModalStore } from '@/store/modal.store';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchcardCheck } from '@/factory/Card/card';
import TossPaymentsCardWidget from '@/components/payment/TossPaymentsCardWidget';
import CardRegisterSkeleton from '@/components/skeleton/CardRegisterSkeleton';
import TossPaymentsCardChange from '@/components/card/TossPaymentsCardChange';

interface ICardData {
  cardName?: string;
  cardNumber?: number;
}

const CardManagementPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['cardchecking'],
    queryFn: fetchcardCheck,
    retry: false
  });

  const { setOpen, setModalType } = useModalStore();

  const [ispayment, setIspayment] = useState(false);
  useEffect(() => {
    if (data) {
      if (data.cardName && data.cardNumber) {
        console.log('bb');
        setIspayment(true);
      }
    }
  }, [data]);

  return (
    <div>
      <div className="max-w-[600px] mx-auto  ">
        <Link href={'/mypage'}>
          <Image
            src="/images/product/LeftVector.svg"
            alt=""
            width={10}
            height={10}
            className="mt-[15px]"
          />
        </Link>

        <div className="text-lg font-bold mt-5">결제 관리</div>
        {isLoading ? (
          <CardRegisterSkeleton />
        ) : ispayment ? (
          <div>
            <PaymentCard cardName={data?.cardName} cardNumber={data?.cardNumber} />
            <div className="text-gray-500 mt-2 flex justify-center">
              결제수단 삭제를 원하시면,
              <span
                className="font-bold border-b-gray-400 border-b-[1px] cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setModalType('cancelCard');
                }}>
                여기
              </span>
              를 클릭해주세요
            </div>
          </div>
        ) : (
          <NotPayment />
        )}
      </div>
    </div>
  );
};

export default CardManagementPage;

const PaymentCard = ({ cardName, cardNumber }: ICardData) => {
  const { requestBillingAuth } = TossPaymentsCardChange();
  return (
    <div className="max-w-[640px] w-full h-[128px]  shadow rounded-[8px] shadow-gray-300 flex flex-col px-[20px] py-[24px]  mt-[20px]">
      <div className="flex justify-between">
        <div className="font-bold">{cardName}카드</div>
        <div className=" text-gray-400  font-bold">{cardNumber}xx-xxxx-xxxx-1234</div>
      </div>

      <div className=" flex justify-end mt-5">
        <div
          className="text-sm font-bold flex justify-center items-center w-[76px] h-[40px]  text-gradient border-gradient border-[1px] rounded-[12px] cursor-pointer"
          onClick={() => {
            requestBillingAuth();
          }}>
          카드 변경
        </div>
      </div>
    </div>
  );
};

const NotPayment = () => {
  const { requestBillingAuth } = TossPaymentsCardRegister();
  return (
    <div
      className="w-full max-w-[320px] h-[172px] mx-auto flex flex-col justify-center items-center rounded-lg border-[3px] border-dashed border-gray-300 cursor-pointer bg-gray-50 "
      onClick={() => {
        requestBillingAuth();
      }}>
      <div className="relative w-8 h-8 bg-gradient1 rounded-full">
        <Image
          src={'/images/payment/Plus.svg'}
          width={18}
          height={18}
          alt="plusButton"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className=" text-base mt-[20px] ">카드 등록하기</div>
    </div>
  );
};

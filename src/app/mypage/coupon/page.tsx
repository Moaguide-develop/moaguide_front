'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Line } from '@/components/common/Line';
import { useCallback, useState } from 'react';
import { useCoupon } from '@/factory/useCoupon';
import { useToastStore } from '@/store/toast.store';
import { throttle } from 'lodash';
const CouponPage = () => {
  const [couponCode, setCouponCode] = useState('');
  const { showToast } = useToastStore();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(event.target.value);
  };

  const handleCouponSubmit = useCallback(() => {
    throttle(() => {
      console.log('쿠폰 코드:', couponCode);
      showToast('쿠폰이 성공적으로 등록되었습니다.');
    }, 1500)();
  }, [couponCode, showToast]);

  const { addCoupon } = useCoupon();
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

        <div className="text-lg font-bold mt-5">
          보유 쿠폰 <span className="text-gradient">3</span>
        </div>

        <div className="mt-[20px]">쿠폰 등록</div>

        <div className="flex">
          <input
            className="max-w-[500px] w-full h-[52px] border-[1px] border-gray-200 rounded-[12px] "
            onChange={handleInputChange}></input>
          <button
            onClick={handleCouponSubmit}
            className="bg-black text-white w-[91px] h-[52px] flex justify-center items-center rounded-[12px] ml-2">
            쿠폰 등록
          </button>
        </div>
        <Line mt={40} mb={40} />
        <Coupon />
        <Coupon />
        <Coupon />
      </div>
    </div>
  );
};

export default CouponPage;

const Coupon = () => {
  return (
    <div className="max-w-[640px] w-full h-[125px] border-[1px] border-gray-300 rounded-[8px] flex flex-col p-[20px] mt-[10px]">
      <div className="text-gradient text-lg font-bold ">1개월 무료 구독권</div>
      <div className="flex  text-gray-400 mt-[10px] text-sm">
        <div>발급일</div>
        <div> | 2024.07.07</div>
      </div>
      <div className="flex  text-gray-400 mt-[5px] text-sm">
        <div>사용기한</div>
        <div> | 2024.07.07</div>
      </div>
    </div>
  );
};

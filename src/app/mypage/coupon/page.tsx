'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Line } from '@/components/common/Line';
import { useCallback, useState } from 'react';
import { useCoupon } from '@/factory/Coupon/useCoupon';
import { useToastStore } from '@/store/toast.store';
import { throttle } from 'lodash';
import { getCoupon } from '@/factory/Coupon/getCoupon';
import { ICoupon, ICouponsType } from '@/types/coupons';
const CouponPage = () => {
  const [couponCode, setCouponCode] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(event.target.value);
  };
  const { addCoupon } = useCoupon();
  const { data } = getCoupon();

  const couponCount = data?.coupons?.length || 0;
  const handleCouponSubmit = useCallback(() => {
    throttle(() => {
      console.log('쿠폰 코드:', couponCode);
      addCoupon.mutate(couponCode);
    }, 1500)();
  }, [couponCode, addCoupon]);

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
          보유 쿠폰 <span className="text-gradient">{couponCount}</span>
        </div>

        <div className="mt-[20px]">쿠폰 등록</div>

        <div className="flex">
          <input
            className="max-w-[500px] w-full h-[52px] border-[1px] border-gray-200 rounded-[12px] px-4 focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out"
            onChange={handleInputChange}
            placeholder="쿠폰 코드를 입력하세요"
          />
          <button
            onClick={handleCouponSubmit}
            className="bg-black text-white w-[91px] h-[52px] flex justify-center items-center rounded-[12px] ml-2">
            쿠폰 등록
          </button>
        </div>
        <Line mt={40} mb={40} />
        {data?.coupons?.map((item: ICoupon, index) => {
          return <CouponLayout key={item.couponId} {...item} />;
        })}
      </div>
    </div>
  );
};

export default CouponPage;

const CouponLayout = ({ createdAt, couponName }: ICoupon) => {
  return (
    <div className="max-w-[640px] w-full h-[125px] border-[1px] border-gray-300 rounded-[8px] flex flex-col p-[20px] mt-[10px]">
      <div className="text-gradient text-lg font-bold ">{couponName}</div>
      <div className="flex  text-gray-400 mt-[10px] text-sm">
        <div>발급일</div>
        <div> | {createdAt}</div>
      </div>

      <div className="flex  text-gray-400 mt-[5px] text-sm">
        <div>사용기한</div>
        <div> | 제한없음</div>
      </div>
    </div>
  );
};

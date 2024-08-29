import type { MainProductItem } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { useRouter } from 'next/navigation';
import React from 'react';

const MainListItem = ({
  product_Id,
  category,
  platform,
  name,
  price,
  priceRate,
  totalPrice,
  dividend,
  lastDivide_rate
}: MainProductItem) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/detail/${product_Id}`)}
      className="mt-5 pb-5 border-b border-gray100 cursor-pointer">
      <div className="flex gap-5">
        {/* 이미지 */}
        <div>
          <img
            src={'/images/home/mock.jpeg'}
            alt=""
            className="w-[82px] h-[82px] rounded-[8px]"
          />
        </div>
        {/* 메인정보 */}
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex items-center gap-2">
            <div className="text-caption3 text-gray400 p-[6px] bg-bg rounded-[4px] flex items-center justify-center">
              {formatCategory(category)}
            </div>
            <div className="text-body7 text-gray300 ">{platform}</div>
          </div>
          <div className="text-body1">{name}</div>
          <div className="flex items-center gap-[6px]">
            <div className="text-body7 text-gray400">{price.toLocaleString()}원</div>
            <div className={`${priceRate > 0 ? 'text-error' : 'text-success'}`}>
              {'('}
              {`${priceRate > 0 ? '+' : ''}`} {priceRate}%{')'}
            </div>
          </div>
        </div>
        {/* 부가정보 */}
        <div className="flex items-center gap-4">
          <div className="p-[6px] bg-error bg-opacity-10 text-error text-body7 rounded-[4px]">
            {lastDivide_rate}%
          </div>
          <div className="cursor-pointer">
            <img src="/images/home/bookmark.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainListItem;

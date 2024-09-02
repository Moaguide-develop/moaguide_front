import type { SearchedItem } from '@/types/homeComponentsType';

import { formatCategory } from '@/utils/formatCategory';
import { useRouter } from 'next/navigation';
import React from 'react';

const SearchedResultItem = ({ productId, name, platform, category }: SearchedItem) => {
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/product/detail/${productId}`)}
      className="p-5 cursor-pointer bg-white rounded-[12px]">
      <div className="flex gap-5 items-center">
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
        </div>
        {/* 부가정보 */}
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <img src="/images/home/bookmark.svg" alt="" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchedResultItem;

import type { SearchedItem } from '@/types/homeComponentsType';
import { formatCategory } from '@/utils/formatCategory';
import { useRouter } from 'next/navigation';
import React from 'react';

interface MainProductItem {
  productId?: string; // SearchedItem에서는 productId 사용, 추천 상품에서는 product_Id
  product_Id?: string; // 추천 상품에서 사용되는 product_Id
  name: string;
  platform: string;
  category: string;
}

const SearchedResultItem = ({ productId, product_Id, name, platform, category }: MainProductItem) => {
  const router = useRouter();

  const id = productId || product_Id;

  return (
    <li
      onClick={() => router.push(`/product/detail/${category}/${id}`)}
      className="p-5 cursor-pointer bg-white rounded-[12px]">
      <div className="flex gap-5 items-center">
        {/* 이미지 */}
        <div>
          <img
            src={`https://d2qf2amuam62ps.cloudfront.net/img/${id}.jpg`}
            alt="Product Image"
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
        {/* <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <img src="/images/home/bookmark.svg" alt="Bookmark" />
          </div>
        </div> */}
      </div>
    </li>
  );
};

export default SearchedResultItem;
import React, { useState } from 'react';
import MainListItem from './MainListItem';
import { useRouter } from 'next/navigation';
import { getMainProduct } from '@/factory/MainProduct';
import MainListItemSkeleton from '../skeleton/MainListItemSkeleton';

const MainList = () => {
  const [category, setCategory] = useState('all');
  const router = useRouter();

  const { data, isLoading } = getMainProduct(category);

  return (
    <div>
      {/* title */}
      <div className="flex items-center justify-between px-5 sm:px-0">
        <div className="text-heading4">주요 상품 현황</div>
        <div
          onClick={() => {
            router.push('/?category=product');
          }}
          className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* nav */}
      <div className="mt-5 sm:mt-8 flex justify-between sm:justify-start items-center gap-5 border-b border-gray100 text-mobileTitle sm:text-title2 px-5 sm:px-0">
        <div
          onClick={() => {
            setCategory('all');
          }}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'all' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          전체
        </div>
        <div
          onClick={() => {
            setCategory('building');
          }}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'building' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          부동산
        </div>
        <div
          onClick={() => {
            setCategory('music');
          }}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'music' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          음악저작권
        </div>
        <div
          onClick={() => {
            setCategory('cow');
          }}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'cow' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          한우
        </div>
        <div
          onClick={() => {
            setCategory('art');
          }}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'art' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          미술품
        </div>
        <div
          onClick={() => {
            setCategory('content');
          }}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'content' ? ' text-gray700 border-b-2 border-normal ' : 'text-gray300'}`}>
          콘텐츠
        </div>
      </div>
      {/* item */}
      <div className="px-5 sm:px-0">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <MainListItemSkeleton key={i} />)
          : data?.map((item, i) => <MainListItem key={i} {...item} />)}
      </div>
    </div>
  );
};

export default MainList;

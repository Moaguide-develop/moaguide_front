import React, { useEffect, useState } from 'react';
import MainListItem from './MainListItem';
import { useRouter } from 'next/navigation';
import { getMainProduct, getMainProductLogin } from '@/factory/MainProduct';
import MainListItemSkeleton from '../skeleton/MainListItemSkeleton';
import { useAuthStore } from '@/store/userAuth.store';
import { useQueryClient } from '@tanstack/react-query';

const MainList = () => {
  const [category, setCategory] = useState('all');
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoggedIn } = useAuthStore();

  const { data, isLoading } = isLoggedIn
    ? getMainProductLogin(category)
    : getMainProduct(category)

  const handleBookmarkInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['MainProduct', category] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-heading4">주요 상품 현황</div>
        <div
          onClick={() => {
            router.push('/product');
          }}
          className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="상품 보기" />
        </div>
      </div>
      <div className="mt-5 sm:mt-8 flex items-center gap-5 border-b border-gray100 text-mobileTitle sm:text-title2 overflow-x-auto whitespace-nowrap">
        <div
          onClick={() => setCategory('all')}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'all' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}
        >
          전체
        </div>
        <div
          onClick={() => setCategory('building')}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'building' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}
        >
          부동산
        </div>
        <div
          onClick={() => setCategory('music')}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'music' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}
        >
          음악저작권
        </div>
        <div
          onClick={() => setCategory('cow')}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'cow' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}
        >
          한우
        </div>
        <div
          onClick={() => setCategory('art')}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'art' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}
        >
          미술품
        </div>
        <div
          onClick={() => setCategory('content')}
          className={`pb-3 sm:pb-5 cursor-pointer ${category === 'content' ? 'text-gray700 border-b-2 border-normal' : 'text-gray300'}`}
        >
          콘텐츠
        </div>
      </div>
      <div className="">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <MainListItemSkeleton key={i} />)
          : data?.map((item, i) => (
            <MainListItem key={i} {...item} handleBookmarkInvalidate={handleBookmarkInvalidate} />
          ))}
      </div>
    </div>
  );
};

export default MainList;
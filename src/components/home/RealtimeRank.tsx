'use client';
import type { RealtimeRankType } from '@/types/homeComponentsType';

import { getRealtimeRank } from '@/factory/RealtimeRank';
import React from 'react';
import RealtimeRankSkeleton from '../skeleton/RealtimeSkeleton';
import { useSearchStore } from '@/store/search.store';
import { useRouter } from 'next/navigation';

const RealtimeRank = () => {
  const router = useRouter();
  const { setKeyword } = useSearchStore();
  const { data, isLoading } = getRealtimeRank();

  // if (isLoading) {
  //   return <RealtimeRankSkeleton />;
  // }

  //돌아가려면 sm:block
  return (
    <div className="max-w-[280px] w-full h-[291px] hidden sm:block">
      <div className="flex flex-col gap-5">
        <div className="mt-1 text-body5 text-black sm:text-heading4 hidden">
          실시간 검색 순위
        </div>
        <div className="p-5 shadow-custom-normal rounded-[12px] flex-1">
          <ul className="flex flex-col gap-5">
            {data?.map((item: RealtimeRankType, i: number) => (
              <li key={i} className="flex gap-3 items-center">
                <div
                  className={`${i < 3 ? 'text-normal text-body6 ' : 'text-gray400 text-body6'}`}>
                  {item.rank}위
                </div>
                <div
                  className="flex-1 text-body2 text-black truncate cursor-pointer"
                  onClick={() => {
                    setKeyword(item.keyword);
                    router.push('/search');
                  }}>
                  {item.keyword}
                </div>

                <div
                  onClick={() => {
                    setKeyword(item.keyword);
                    router.push('/search');
                  }}
                  className="w-6 h-6 rounded-full bg-gray100 flex items-center justify-center cursor-pointer">
                  <img src="/images/home/search.svg" alt="search" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RealtimeRank;

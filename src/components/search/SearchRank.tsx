'use client';
import { getRealtimeRank } from '@/factory/RealtimeRank';
import React from 'react';
import RealtimeRankSkeleton from '../skeleton/RealtimeSkeleton';
import { RealtimeRankType } from '@/types/homeComponentsType';
import SearchRankSkeleton from '../skeleton/SearchRankSkeleton';

const SearchRank = () => {
  const { data, isLoading } = getRealtimeRank();

  if (isLoading) {
    return <SearchRankSkeleton />;
  }
  return (
    <div className="mt-3 w-full h-[291px]">
      <div className="p-5 shadow-custom-normal rounded-[12px] flex-1">
        <ul className="flex flex-col gap-5">
          {data?.map((item: RealtimeRankType, i: number) => (
            <li key={i} className="flex gap-3 items-center">
              <div
                className={`${i < 3 ? 'text-normal text-body6 ' : 'text-gray400 text-body6'}`}>
                {item.rank}위
              </div>
              <div className="flex-1 text-body2 text-black truncate">{item.keyword}</div>
              {/* todo : 돋보기 누르면 그대로 검색 쿼리에 keyword가 들어가게하기 */}
              <div className="w-6 h-6 rounded-full bg-gray100 flex items-center justify-center cursor-pointer">
                <img src="/images/home/search.svg" alt="search" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchRank;

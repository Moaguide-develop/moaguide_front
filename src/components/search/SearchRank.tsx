'use client';
import { getRealtimeRank } from '@/factory/RealtimeRank';
import React, { Dispatch } from 'react';
import { RealtimeRankType } from '@/types/homeComponentsType';
import SearchRankSkeleton from '../skeleton/SearchRankSkeleton';

interface SearchRankType {
  setKeyWord: Dispatch<React.SetStateAction<string>>;
}

const SearchRank = ({ setKeyWord }: SearchRankType) => {
  const { data, isLoading } = getRealtimeRank();

  const handleClick = (keyword: string) => {
    setKeyWord(keyword);
  };

  if (isLoading) {
    return <SearchRankSkeleton />;
  }

  return (
    <div className="mt-3 w-full h-[291px]">
      <div className="p-5 shadow-custom-normal rounded-[12px] flex-1 bg-white">
        <ul className="flex flex-col gap-5">
          {data?.map((item: RealtimeRankType, i: number) => (
            <li key={i} className="flex gap-3 items-center">
              <div
                className={`${i < 3 ? 'text-normal text-body6 ' : 'text-gray400 text-body6'}`}
                style={{ marginLeft: item.rank === 1 ? '0.12rem' : '0' }}>
                {item.rank}위
              </div>
              <div className="flex-1 text-body2 text-black truncate" onClick={() => handleClick(item.keyword)}>{item.keyword}</div>
              {/* todo : 돋보기 누르면 그대로 검색 쿼리에 keyword가 들어가게하기 */}
              <div className="w-6 h-6 rounded-full bg-gray100 flex items-center justify-center cursor-pointer">
                <img
                  onClick={() => handleClick(item.keyword)}
                  src="/images/home/search.svg"
                  alt="search"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchRank;

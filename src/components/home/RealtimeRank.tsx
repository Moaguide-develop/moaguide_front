import { getRealtimeRank } from '@/factory/RealtimeRank';
import type { RealtimeRankType } from '@/types/homeComponentsType';
import React from 'react';

const RealtimeRank = () => {
  const { data } = getRealtimeRank();
  return (
    <div className="max-w-[280px] w-full h-[291px] hidden desk2:block">
      <div className="flex flex-col gap-5">
        <div className="mt-1 text-body5 text-black desk2:text-heading4">
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
                <div className="flex-1 text-body2 text-black truncate">
                  {item.keyword}
                </div>
                {/* todo : 돋보기 누르면 그대로 검색 쿼리에 keyword가 들어가게하기 */}
                <div className="w-6 h-6 rounded-full bg-gray100 flex items-center justify-center cursor-pointer">
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

'use client';
import { getRealtimeRank } from '@/factory/RealtimeRank';
import { useSearchStore } from '@/store/search.store';

//모바일 버전에서의 실시간 검색어 순위입니다
const MoblieRank = () => {
  const { setKeyword } = useSearchStore();
  const { data, isLoading } = getRealtimeRank();

  return (
    <div className="sm:hidden px-5 py-[28px]">
      <div className="text-heading4">실시간 검색 순위</div>
      <div className="mt-[28px]">
        <div className="gap-3 py-[14px] px-4 w-full flex items-center justify-between border border-normal rounded-[12px]">
          <div className="text-mobileTitle text-normal">{data && data[0].rank}위</div>
          <div className="flex-1 text-body2">{data && data[0].keyword}</div>
          <div className="w-6 h-6 rounded-full bg-gray100 flex items-center justify-center cursor-pointer">
            <img src="/images/home/search.svg" alt="search" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoblieRank;

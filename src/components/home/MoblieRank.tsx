'use client';
import { getRealtimeRank } from '@/factory/RealtimeRank';
import { useSearchStore } from '@/store/search.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

//모바일 버전에서의 실시간 검색어 순위입니다
const MoblieRank = () => {
  const router = useRouter();
  const { setKeyword } = useSearchStore();
  const { data, isLoading } = getRealtimeRank();
  const [currentRank, setCurrentRank] = useState(0);
  const [fade, setFade] = useState(true); // 애니메이션 상태 관리

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRank((prevRank) => {
          if (data && data.length > 0) {
            return (prevRank + 1) % data.length;
          }
          return prevRank;
        });
        setFade(true);
      }, 200);
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="sm:hidden px-5 py-[28px]">
      <div className="text-heading4">실시간 검색 순위</div>
      <div className="mt-[28px]">
        {isLoading ? (
          <div className="gap-2 py-[4px] px-2 w-full flex items-center justify-between rounded-[12px] animate-pulse">
            <div className="h-6 w-12 bg-gray-200 rounded"></div>
            <div className="flex-1 h-6 bg-gray-200 rounded ml-1"></div>
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          </div>
        ) : (
          data &&
          data.length > 0 && ( // data가 있을 때만 렌더링
            <div
              onClick={() => {
                setKeyword(data[currentRank].keyword as string);
                router.push('/search');
              }}
              className={`gap-3 py-[12px] px-4 w-full flex items-center justify-between border border-normal rounded-[12px] transition-opacity duration-300 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}>
              <div className="text-mobileTitle text-normal">
                {data[currentRank].rank}위
              </div>
              <div className="flex-1 text-body2">{data[currentRank].keyword}</div>
              <div className="w-6 h-6 rounded-full bg-gray100 flex items-center justify-center cursor-pointer">
                <img src="/images/home/search.svg" alt="search" />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MoblieRank;

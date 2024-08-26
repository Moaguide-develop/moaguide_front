import React from 'react';

const MainListItemSkeleton = () => {
  return (
    <div className="mt-5 pb-5 border-b border-gray100 cursor-pointer animate-pulse">
      <div className="flex gap-5">
        {/* 이미지 Skeleton */}
        <div className="w-[82px] h-[82px] rounded-[8px] bg-gray200"></div>

        {/* 메인정보 Skeleton */}
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex items-center gap-2">
            <div className="w-16 h-6 bg-gray200 rounded-[4px]"></div>
            <div className="w-12 h-6 bg-gray200 rounded-[4px]"></div>
          </div>
          <div className="w-3/4 h-6 bg-gray200 rounded-[4px]"></div>
          <div className="flex items-center gap-[6px]">
            <div className="w-24 h-6 bg-gray200 rounded-[4px]"></div>
            <div className="w-12 h-6 bg-gray200 rounded-[4px]"></div>
          </div>
        </div>

        {/* 부가정보 Skeleton */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-6 bg-gray200 rounded-[4px]"></div>
          <div className="w-6 h-6 bg-gray200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MainListItemSkeleton;

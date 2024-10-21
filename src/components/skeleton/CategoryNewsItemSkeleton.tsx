import React from 'react';

const CategoryNewsItemSkeleton = () => {
  return (
    <div className="mt-5 pb-5 border-b border-gray100 flex gap-5 items-center">
      {/* 이미지 스켈레톤 */}
      <div className="w-[132px] h-[93px] bg-gray200 rounded-[12px] animate-pulse" />

      <div className="flex-1 flex flex-col justify-between h-[93px] py-[5px]">
        {/* 제목 스켈레톤 */}
        <div className="h-[24px] bg-gray200 rounded animate-pulse" />

        <div className="flex items-center justify-between">
          {/* 카테고리 스켈레톤 */}
          <div className="h-[18px] bg-gray200 rounded w-[100px] animate-pulse" />
          {/* 날짜 스켈레톤 */}
          <div className="h-[18px] bg-gray200 rounded w-[60px] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CategoryNewsItemSkeleton;

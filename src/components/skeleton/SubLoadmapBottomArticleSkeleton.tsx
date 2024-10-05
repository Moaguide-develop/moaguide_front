import React from 'react';

const SubLoadmapBottomArticleSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
      {/* 첫 번째 스켈레톤 */}
      <div className='py-5'>
        <div className='flex gap-5 items-center cursor-pointer animate-pulse'>
          <div>
            <div className="w-[70px] h-[70px] bg-gray200 rounded-[8px]"></div>
          </div>
          <div className='flex-1 flex flex-col gap-3'>
            {/* Title Skeleton */}
            <div className="w-full lg:w-2/4 h-[16px] bg-gray200 rounded-[4px]"></div>
            {/* Description Skeleton */}
            <div className="w-full h-[24px] bg-gray200 rounded-[4px]"></div>
          </div>
        </div>
      </div>

      {/* 두 번째 스켈레톤 */}
      <div className='py-5'>
        <div className='flex gap-5 items-center cursor-pointer animate-pulse'>
          <div>
            <div className="w-[70px] h-[70px] bg-gray200 rounded-[8px]"></div>
          </div>
          <div className='flex-1 flex flex-col gap-3'>
            {/* Title Skeleton */}
            <div className="w-full lg:w-2/4 h-[16px] bg-gray200 rounded-[4px]"></div>
            {/* Description Skeleton */}
            <div className="w-full h-[24px] bg-gray200 rounded-[4px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubLoadmapBottomArticleSkeleton;
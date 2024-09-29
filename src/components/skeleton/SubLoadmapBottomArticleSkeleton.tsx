import React from 'react';

const SubLoadmapBottomArticleSkeleton = () => {
  return (
    <div className='py-5'>
    <div className='flex gap-5 items-center cursor-pointer animate-pulse'>
      <div>
        <div className="w-[70px] h-[70px] bg-gray200 rounded-[8px]"></div>
      </div>
      <div className='flex-1 flex flex-col gap-3'>
        {/* Number and Title Skeleton */}
        <div className="w-1/4 h-[16px] bg-gray200 rounded-[4px]"></div>
        {/* Description Skeleton */}
        <div className="w-3/4 h-[24px] bg-gray200 rounded-[4px]"></div>
      </div>
      {/* Image Skeleton */}
    </div>
    </div>
  );
};

export default SubLoadmapBottomArticleSkeleton;
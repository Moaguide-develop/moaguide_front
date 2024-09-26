import React from 'react';

const CategoryPracticeItemSkeleton = () => {
  return (
    <div className="py-5 border-b border-gray100 flex gap-5 items-center cursor-pointer animate-pulse">
      <div className="flex-1 flex flex-col gap-3">
        {/* Category Skeleton */}
        <div className="max-w-max p-[6px] h-[20px] bg-gray200 rounded-[4px]"></div>
        {/* Title Skeleton */}
        <div className="w-3/4 h-[24px] bg-gray200 rounded-[4px]"></div>
        {/* Date Skeleton */}
        <div className="w-1/4 h-[16px] bg-gray200 rounded-[4px]"></div>
      </div>
      {/* Image Skeleton */}
      <div>
        <div className="w-[132px] h-[93px] bg-gray200 rounded-[8px]"></div>
      </div>
    </div>
  );
};

export default CategoryPracticeItemSkeleton;

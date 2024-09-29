import { CategorySubloadmapSkeletonItemProps } from '@/types/homeComponentsType';
import React from 'react';

const SubLoadmapSkeleton :React.FC<CategorySubloadmapSkeletonItemProps> = ({ isTop, isBottom }) => {
  return (
    <div className={`flex gap-5 items-center cursor-pointer animate-pulse ${isTop ? 'border-t border-black pt-8 mt-8' : ''} ${isBottom ? 'pb-6' : 'pb-4'}`}>
      <div className='flex-1 flex flex-col gap-5'>
        {/* Number and Title Skeleton */}
        <div className="w-1/4 h-[16px] bg-gray200 rounded-[4px]"></div>
        {/* Description Skeleton */}
        <div className="w-3/4 h-[24px] bg-gray200 rounded-[4px]"></div>
      </div>
      {/* Image Skeleton */}
      <div>
      <div className="w-[132px] h-[60px] bg-gray200 rounded-[8px]"></div>
      </div>
    </div>
  );
};

export default SubLoadmapSkeleton;
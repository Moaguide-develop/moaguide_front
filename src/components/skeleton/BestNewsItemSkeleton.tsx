import React from 'react';

const BestNewsItemSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 cursor-pointer animate-pulse mt-5 sm:mt-0">
      <div className='flex-1'>
      <div className="relative mb-4">
        <div className="h-[186px] bg-gray-300 rounded-[12px]" />
      </div>
      <div className="w-full h-[24px] bg-gray-300 rounded-md mb-4" />
      <div className="w-full flex items-center justify-between ">
        <div className="w-1/4 h-[18px] bg-gray-300 rounded-md" />
        <div className="w-1/4 h-[18px] bg-gray-300 rounded-md" />
      </div>
      </div>
    </div>
  );
};

export default BestNewsItemSkeleton;

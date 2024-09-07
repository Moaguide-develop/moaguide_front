import React from 'react';

const BestNewsItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 cursor-pointer animate-pulse mt-5 sm:mt-0">
      <div className="relative">
        <div className="w-[350px] h-[186px] sm:w-[336px] sm:h-[186px] bg-gray-300 rounded-[12px]" />
      </div>

      <div className="w-[348px] sm:w-[313px] h-[24px] bg-gray-300 rounded-md" />
      <div className="flex items-center justify-between ">
        <div className="w-[100px] h-[18px] bg-gray-300 rounded-md" />
        <div className="w-[80px] h-[18px] bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default BestNewsItemSkeleton;

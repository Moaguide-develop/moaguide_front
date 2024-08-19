import React from 'react';

const BestNewsItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 cursor-pointer animate-pulse">
      <div className="relative">
        <div className="w-[336px] h-[186px] bg-gray-300 rounded-[12px]" />
      </div>
      <div className="absolute mt-1 ml-1 w-[24px] h-[24px] bg-gray-400 rounded-full" />
      <div className="w-[313px] h-[24px] bg-gray-300 rounded-md" />
      <div className="flex items-center justify-between ">
        <div className="w-[100px] h-[18px] bg-gray-300 rounded-md" />
        <div className="w-[80px] h-[18px] bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default BestNewsItemSkeleton;

import React from 'react';

const CardRegisterSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 cursor-pointer animate-pulse mt-5 sm:mt-0">
      <div className="flex-1 w-full ">
        <div className="relative mb-4">
          <div className="h-[106px] bg-gray-300 rounded-[12px] mt-[10px]" />
        </div>
        <div className="w-1/2 h-[24px] bg-gray-300 rounded-md mb-4 mx-auto flex justify-center items-center" />
        <div className="w-full flex items-center justify-between"></div>
      </div>
    </div>
  );
};

export default CardRegisterSkeleton;

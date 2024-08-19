import React from 'react';

const MainReportItemSkeleton = () => {
  return (
    <div className="mt-5 pb-5 border-b border-gray100 flex gap-5 animate-pulse">
      {/* 왼쪽 */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="p-[6px] w-20 h-6 bg-gray-300 rounded-[4px] max-w-max" />
        <div className="w-full h-6 bg-gray-300 rounded-md" />
        <div className="w-24 h-4 bg-gray-200 rounded-md" />
      </div>
      {/* 오른쪽 */}
      <div className="w-[132px] h-[93px] bg-gray-300 rounded-[8px]" />
    </div>
  );
};

export default MainReportItemSkeleton;

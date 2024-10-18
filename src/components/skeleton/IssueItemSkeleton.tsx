import React from 'react';

const IssueItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 cursor-pointer animate-pulse w-full h-full">
      <div className="relative w-full" style={{ paddingTop: '55.36%' }}>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-[12px]" />
      </div>
      <div className="w-full h-6 bg-gray-300 rounded-md" />
      <div className="flex items-center justify-between mt-auto">
        <div className="w-[100px] h-4 bg-gray-300 rounded-md" />
        <div className="w-[80px] h-4 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default IssueItemSkeleton;
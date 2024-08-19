import React from 'react';

const IssueItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 cursor-pointer animate-pulse">
      <div className="w-[336px] h-[186px] bg-gray-300 rounded-[12px]" />
      <div className="w-[313px] h-6 bg-gray-300 rounded-md" />
      <div className="flex items-center justify-between">
        <div className="w-[100px] h-4 bg-gray-300 rounded-md" />
        <div className="w-[80px] h-4 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default IssueItemSkeleton;

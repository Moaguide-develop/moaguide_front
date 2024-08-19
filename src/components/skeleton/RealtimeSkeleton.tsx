import React from 'react';

const RealtimeRankSkeleton = () => {
  return (
    <div className="max-w-[280px] w-full h-[291px] hidden desk2:block">
      <div className="flex flex-col gap-5 animate-pulse">
        <div className="mt-1 h-6 w-32 bg-gray-300 rounded-md desk2:h-8" />
        <div className="p-5 shadow-custom-normal rounded-[12px] flex-1">
          <ul className="flex flex-col gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex gap-3 items-center">
                <div className={`w-8 h-4 bg-gray-300 rounded-md`} />
                <div className="flex-1 h-4 bg-gray-300 rounded-md" />
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RealtimeRankSkeleton;

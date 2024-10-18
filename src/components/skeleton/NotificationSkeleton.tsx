import React from 'react';

const NotificationSkeleton = () => {
  return (
    <div className='w-full mx-auto bg-bg pb-4'>
    <div className="w-full mx-auto animate-pulse flex justify-between items-center h-[109px]">
    <div className="mx-auto lg:max-w-[1000px] w-[90%] lg:w-[100%] h-[109px] bg-gray-200 rounded-[12px]"></div>
  </div>
  </div>
  );
};

export default NotificationSkeleton;

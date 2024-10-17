import React from 'react';

const NotificationSkeleton = () => {
  return (
    <div className="animate-pulse flex justify-between items-center py-4 border-b">
      <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
      <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
    </div>
  );
};

export default NotificationSkeleton;
'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Skeleton from '../skeleton/NotificationSkeleton'; 
import _ from 'lodash'; 
import { useNotifications } from '@/factory/useNotification';

const AlarmItem = () => {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetching, 
    isFetchingNextPage, 
    isLoading 
  } = useNotifications(); 

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedAlarmPage');

    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowSkeleton(false); 
        sessionStorage.setItem('hasVisitedAlarmPage', 'true'); 
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(false);
    }
  }, []);

  const loadMore = useCallback(
    _.throttle(() => {
      console.log("Loading more notifications...");
      if (hasNextPage && !isFetching && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, 2000),
    [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage]
  );

  const notifications = data?.pages.flatMap(page => page.notifications) || []; 

  return (
    <div className="min-h-screen">
       <div className="max-w-[360px] mx-auto desk:max-w-[1000px] w-[90%] lg:w-[100%] flex items-center gap-5 text-body5 sm:text-title2 mt-5">
        <div 
          className={'pb-4 cursor-pointer text-gray700 border-b-2 border-normal'}
        >
          재테크 가이드
        </div>
      </div>
      <div className='h-4 bg-bg'>
      </div>
      {isLoading || showSkeleton ? (
        <div>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <Virtuoso
          style={{ height: '100%', backgroundColor: 'rgba(247, 248, 251, 0.8)'  }}
          useWindowScroll
          data={notifications}
          totalCount={notifications.length}
          endReached={loadMore} 
          components={{
            List: React.forwardRef(({ style, ...listProps }, ref) => (
              <div
                {...listProps}
                ref={ref}
                style={{ ...style, backgroundColor: 'rgba(247, 248, 251, 0.8)' }}
              />
            )),
          }}
          itemContent={(index, notification) => (
            <><div
            key={notification.id}
            className="bg-white min-h-[109px] flex justify-between items-center p-4 shadow-md mx-auto lg:max-w-[1000px] w-[90%] lg:w-[100%] border border-[#ECEFF2] rounded-[12px]"
          >
            <div className='flex flex-col justify-between h-full w-[80%] gap-5'>
              <div className="text-sm text-[#6E6F73] font-medium">
                관심 상품 업데이트
              </div>
              <div className="text-black text-md">
                {notification.message}
              </div>
            </div>
            <div className="min-w-[20px] pl-[10px] flex mb-auto text-[#A2A5AA] text-sm whitespace-nowrap">
              {notification.date}
            </div>
          </div>
            <div className='h-4'>
            </div>
          </>
          )}
        />
      )}

      {isFetchingNextPage && (
        <div>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlarmItem;
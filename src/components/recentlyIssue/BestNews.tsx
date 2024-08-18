import React from 'react';
import BestNewsItem from './BestNewsItem';
import type { MainNews } from '@/types/homeComponentsType';
import { getRecentlyIssues } from '@/factory/RecentlyIssues';
import BestNewsItemSkeleton from '../skeleton/BestNewsItemSkeleton';

const BestNews = () => {
  const { data, isLoading } = getRecentlyIssues();

  return (
    <div className="pt-[28px] pb-[28px] max-w-[1000px] w-full mx-auto">
      <div className="text-heading4">👀 오늘 가장 많이 본 뉴스</div>
      <div className="mt-[28px] grid grid-cols-3 gap-5 gird">
        {isLoading ? (
          <>
            <BestNewsItemSkeleton />
            <BestNewsItemSkeleton />
            <BestNewsItemSkeleton />
          </>
        ) : (
          data?.map((item: MainNews, i: number) => (
            <BestNewsItem key={item.id} item={item} rank={i + 1} />
          ))
        )}
      </div>
    </div>
  );
};

export default BestNews;

import React from 'react';
import IssueItem from './IssueItem';
import { getReportIssues } from '@/factory/ReportIssue';
import { MainNews } from '@/types/homeComponentsType';
import IssueItemSkeleton from '../skeleton/IssueItemSkeleton';
import { useRouter } from 'next/navigation';

const RecentlyIssue = () => {
  const { mainNews, isLoading } = getReportIssues();
  const router = useRouter();

  return (
    <div className="pb-[50px] sm:pb-[100px]">
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">최신 이슈</div>
        <div
          onClick={() => {
            router.push('/newissue');
          }}
          className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* 아이템 */}
      <div className="mt-5 sm:mt-[28px] grid grid-cols-2 gap-5 gird">
        {isLoading ? (
          <>
            <IssueItemSkeleton />
            <IssueItemSkeleton />
          </>
        ) : (
          mainNews
            .slice(0, 2)
            .map((item: MainNews, i: number) => <IssueItem key={i} {...item} />)
        )}
      </div>
    </div>
  );
};

export default RecentlyIssue;

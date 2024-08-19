import React from 'react';
import IssueItem from './IssueItem';
import { getReportIssues } from '@/factory/ReportIssue';
import { MainNews } from '@/types/homeComponentsType';
import { useNavStore } from '@/store/nav.store';
import IssueItemSkeleton from '../skeleton/IssueItemSkeleton';

const RecentlyIssue = () => {
  const { mainNews, isLoading } = getReportIssues();
  const { setCurrentNav } = useNavStore();

  return (
    <div>
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">최신 이슈</div>
        <div onClick={() => setCurrentNav('new_issue')} className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* 아이템 */}
      <div className="mt-[28px] grid grid-cols-2 gap-5 gird">
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

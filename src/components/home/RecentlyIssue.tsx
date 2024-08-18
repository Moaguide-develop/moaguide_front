import React from 'react';
import IssueItem from './IssueItem';
import { getReportIssues } from '@/factory/ReportIssue';
import { MainNews } from '@/types/homeComponentsType';

const RecentlyIssue = () => {
  const { mainNews } = getReportIssues();
  return (
    <div>
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">최신 이슈</div>
        <div className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* 아이템 */}
      <div className="mt-[28px] grid grid-cols-2 gap-5 gird">
        {mainNews.slice(0, 2).map((item: MainNews, i: number) => (
          <IssueItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyIssue;

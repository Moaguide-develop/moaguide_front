import React from 'react';
import MainReportItem from './MainReportItem';
import { getReportIssues } from '@/factory/ReportIssue';
import type { MainReportType } from '@/types/homeComponentsType';
import { useNavStore } from '@/store/nav.store';
import MainReportItemSkeleton from '../skeleton/MainReportItemSkeleton';

const MainReport = () => {
  const { mainReport, isLoading } = getReportIssues();
  const { setCurrentNav } = useNavStore();

  return (
    <div>
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">주요 리포트</div>
        <div onClick={() => setCurrentNav('report')} className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* 캐러셀 이미지 */}
      <div className="mt-[26px]">
        <img src="/images/home/report_main.svg" alt="" />
      </div>
      {/* 아이템 */}
      <div className="my-[28px]">
        {isLoading ? (
          <>
            <MainReportItemSkeleton />
            <MainReportItemSkeleton />
            <MainReportItemSkeleton />
          </>
        ) : (
          mainReport.map((item: MainReportType, i: number) => (
            <MainReportItem
              key={i}
              title={item.title}
              date={item.date}
              category={item.category}
              id={item.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MainReport;

import type { MainReportType } from '@/types/homeComponentsType';

import React from 'react';
import MainReportItem from './MainReportItem';
import { getReportIssues } from '@/factory/ReportIssue';

import MainReportItemSkeleton from '../skeleton/MainReportItemSkeleton';
import { useRouter } from 'next/navigation';

const MainReport = () => {
  const { mainReport, isLoading } = getReportIssues();
  const router = useRouter();

  return (
    <div className="px-5 sm:px-0">
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <div className="text-heading4">주요 리포트</div>
        <div
          onClick={() => {
            router.push('/?category=report');
          }}
          className="cursor-pointer">
          <img src="/images/home/item_right.svg" alt="" />
        </div>
      </div>
      {/* 캐러셀 이미지 */}
      <div className="hidden mt-[26px] sm:block">
        <img src="/images/home/report_main.svg" alt="" />
      </div>
      <div className="mt-5 sm:hidden mx-auto rounded-[12px] h-[130px] w-full bg-cover bg-[url('/images/home/report_layout.svg')]">
        <div className="text-normal text-title2 ml-6 sm:ml-11 pt-5">
          <div>투자 가이드</div>
        </div>
        <div className="ml-6 sm:ml-11 mt-5 max-w-max">
          <div className="text-gray700 text-title2">A-Z까지 소액으로</div>
          <div className="text-gray700 text-title2">조각 투자의 시작!</div>
        </div>
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

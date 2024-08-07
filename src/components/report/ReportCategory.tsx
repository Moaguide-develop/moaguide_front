import { useReportStore } from '@/store/report.store';
import React from 'react';

const ReportCategory = () => {
  const { currentCategory, setCurrentCategory } = useReportStore();
  return (
    <div className="mt-[28px]">
      <div className="flex items-center gap-20">
        {/* 전체 */}
        <div className="flex flex-col gap-2 items-center">
          <div
            className={`text-body5 text-[#713CE2]  w-[60px] h-[60px] p-[14px] flex justify-center items-center rounded-[12px] border border-[#713CE2]`}>
            ALL
          </div>
          <div className={`text-body5 text-[#713CE2]`}>전체</div>
        </div>
        {/* 부동산 */}
        <div>
          <div></div>
          <div></div>
        </div>
        {/* 음악 */}
        <div>
          <div></div>
          <div></div>
        </div>
        {/* 한우 */}
        <div>
          <div></div>
          <div></div>
        </div>
        {/* 미술 */}
        <div>
          <div></div>
          <div></div>
        </div>
        {/* 콘텐츠 */}
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ReportCategory;

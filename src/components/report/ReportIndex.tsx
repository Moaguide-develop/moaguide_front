import React from 'react';
import ReportCategory from './ReportCategory';
import { useReportStore } from '@/store/report.store';

const ReportIndex = () => {
  return (
    <div>
      <nav className="w-full flex items-center justify-center border-b border-gray100">
        <ReportCategory />
      </nav>
    </div>
  );
};

export default ReportIndex;

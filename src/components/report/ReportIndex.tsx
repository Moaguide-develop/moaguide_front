import React from 'react';
import ReportCategory from './ReportCategory';
import { useReportStore } from '@/store/report.store';

const ReportIndex = () => {
  return (
    <div>
      <nav className="w-full flex items-center justify-center">
        <ReportCategory />
      </nav>
    </div>
  );
};

export default ReportIndex;

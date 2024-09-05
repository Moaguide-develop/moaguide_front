import ReportIndex from '@/components/report/ReportIndex';
import Navbar from '@/components/common/Navbar';
import { Suspense } from 'react';
const ReportPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        <ReportIndex />
      </div>
    </Suspense>
  );
};

export default ReportPage;

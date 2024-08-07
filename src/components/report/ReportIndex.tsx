import React from 'react';
import ReportCategory from './ReportCategory';
import Container from '../common/Container';
import CategoryReport from './CategoryReport';

const ReportIndex = () => {
  return (
    <div>
      <nav className="w-full flex items-center justify-center border-b border-gray100">
        <ReportCategory />
      </nav>
      <Container>
        <section className="flex justify-center mt-6 pb-[29px]">
          <img src="/images/report/report_main.svg" alt="" />
        </section>
        <section>
          <CategoryReport />
        </section>
        <div className="h-12" />
      </Container>
    </div>
  );
};

export default ReportIndex;

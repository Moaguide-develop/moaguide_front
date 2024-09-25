'use client';
import React, { useEffect } from 'react';
import ReportCategory from './ReportCategory';
import Container from '../common/Container';
import CategoryReport from './CategoryReport';

const ReportIndex = () => {
  /**
   * 하단에서 탭 변경시 위치가 그대로 하단으로 유지되는 문제가 발생해 강제로 끌어올리기
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Container>
        <section className="hidden sm:flex justify-center mt-6 pb-[29px]">
          <img src="/images/report/report_main.svg" alt="" />
        </section>
        <section className="px-5 sm:px-0">
          <CategoryReport />
        </section>
        <div className="h-[100px] sm:h-12" />
      </Container>
    </div>
  );
};

export default ReportIndex;

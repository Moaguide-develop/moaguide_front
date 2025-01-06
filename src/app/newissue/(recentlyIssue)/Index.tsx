'use client';

import React, { useEffect } from 'react';
import BestNews from './BestNews';
import CategoryNews from './CategoryNews';
import Container from '../../../components/common/Container';

const RecentlyIssueIndex = () => {
  /**
   * 하단에서 탭 변경시 위치가 그대로 하단으로 유지되는 문제가 발생해 강제로 끌어올리기
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <article className="bg-bg">
        <BestNews />
      </article>
      <Container>
        <section className="max-w-[1000px] w-full">
          <CategoryNews />
        </section>
        <div className="h-20" />
      </Container>
    </div>
  );
};

export default RecentlyIssueIndex;

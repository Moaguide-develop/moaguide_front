import React from 'react';
import BestNews from './BestNews';
import CategoryNews from './CategoryNews';
import Container from '../common/Container';

const RecentlyIssueIndex = () => {
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

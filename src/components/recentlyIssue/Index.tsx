import React from 'react';
import BestNews from './BestNews';
import CategoryNews from './CategoryNews';

const RecentlyIssueIndex = () => {
  return (
    <div>
      <article className="max-w-[1000px] w-full">
        <BestNews />
      </article>
      <section className="max-w-[1000px] w-full">
        <CategoryNews />
      </section>
    </div>
  );
};

export default RecentlyIssueIndex;

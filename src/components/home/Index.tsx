import React from 'react';
import Guide from './Guide';
import RealtimeRank from './RealtimeRank';
import SubMenu from './SubMenu';
import MainItem from './MainList';

const HomeIndex = () => {
  return (
    <div>
      <section className="max-w-[1000px] mx-auto flex items-center desk:min-w-[400px] gap-[28px] mt-[29px]">
        <Guide />
        <RealtimeRank />
      </section>
      <aside className="max-w-[692px] w-full mt-[28px]">
        <SubMenu />
      </aside>
      <article className="max-w-[692px] w-full mt-10">
        <MainItem />
      </article>
      <div className="h-10" />
    </div>
  );
};

export default HomeIndex;

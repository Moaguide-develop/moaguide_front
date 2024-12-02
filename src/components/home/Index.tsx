'use client';
import React from 'react';
import Guide from './Guide';
import RealtimeRank from './RealtimeRank';
import SubMenu from './SubMenu';
import MainItem from './MainList';
import MainReport from './MainReport';
import RecentlyIssue from './RecentlyIssue';
import Container from '../common/Container';
import HomeFooter from './HomeFooter';
import MoblieRank from './MoblieRank';
import MobileTest from './MobileTest';

const HomeIndex = () => {
  return (
    <div className="overflow-x-hidden">
      <section className="max-w-[1000px] mx-auto flex items-center justify-center gap-[28px] sm:mt-[29px] w-[90%] lg:w-[100%]">
        <Guide />
        <RealtimeRank />
      </section>
      <Container>
        <aside className="max-w-[692px] w-full mt-[28px]">
          <SubMenu />
          {/* <MobileTest /> */}
          <MoblieRank />
        </aside>
        <article className="max-w-[692px] w-full mt-[18px] sm:mt-10">
          <MainItem />
        </article>
        <article className=" mt-[28px] max-w-[692px] w-full">
          <MainReport />
        </article>
        <article className=" mt-[28px] max-w-[692px] w-full">
          <RecentlyIssue />
        </article>
      </Container>
      <HomeFooter />
    </div>
  );
};

export default HomeIndex;

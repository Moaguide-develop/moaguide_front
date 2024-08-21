import Navbar from '@/components/common/Navbar';
import HomeIndex from '@/components/home/Index';
import RecentlyIssueIndex from '@/components/recentlyIssue/Index';

// import { useNavStore } from '@/store/nav.store';
import React from 'react';
import ProductPage from './product/page';
import { SummaryData } from '@/types/Diviend';
import Product from '@/components/product/Product';
import ReportIndex from '@/components/report/ReportIndex';

const HomePage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const response = await fetch(`https://api.moaguide.com/summary/recent/building`, {
    cache: 'no-store'
  });

  const data: SummaryData = await response.json();
  console.log(searchParams['category']);
  return (
    <div>
      <Navbar />

      {searchParams['category'] === 'newissue' ? (
        <RecentlyIssueIndex />
      ) : searchParams['category'] === 'product' ? (
        <Product divide={data.divide} summary={data.summary} />
      ) : searchParams['category'] === 'report' ? (
        <ReportIndex />
      ) : (
        <HomeIndex />
      )}
    </div>
  );
};

export default HomePage;

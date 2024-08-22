import Navbar from '@/components/common/Navbar';
import HomeIndex from '@/components/home/Index';
import RecentlyIssueIndex from '@/components/recentlyIssue/Index';

// import { useNavStore } from '@/store/nav.store';
import React from 'react';
import ProductPage from './product/page';
import { IReport, IReportData, ISummaryData } from '@/types/Diviend';
import Product from '@/components/product/Product';
import ReportIndex from '@/components/report/ReportIndex';

const HomePage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const buildingDiviedResponse = await fetch(
    `https://api.moaguide.com/summary/recent/building`,
    {
      cache: 'no-store'
    }
  );

  const buildingReportResponse = await fetch(
    'https://api.moaguide.com/summary/report/building',
    {
      cache: 'no-store'
    }
  );

  const buildingDiviedData: ISummaryData = await buildingDiviedResponse.json();

  const buildingReportData: IReport[] = await buildingReportResponse.json();

  console.log(searchParams['category']);
  return (
    <div>
      <Navbar />

      {searchParams['category'] === 'newissue' ? (
        <RecentlyIssueIndex />
      ) : searchParams['category'] === 'product' ? (
        <Product
          divide={buildingDiviedData.divide}
          summary={buildingDiviedData.summary}
          report={buildingReportData}
        />
      ) : searchParams['category'] === 'report' ? (
        <ReportIndex />
      ) : (
        <HomeIndex />
      )}
    </div>
  );
};

export default HomePage;

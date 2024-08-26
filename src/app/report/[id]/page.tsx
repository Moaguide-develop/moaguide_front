import ReportDetailIndex from '@/components/report/ReportDetailIndex';
import type { ReportListsItem } from '@/types/homeComponentsType';
import React from 'react';

interface ReportDetailPageProps {
  params: {
    id: string;
  };
}

const ReportDetailPage = async ({ params }: ReportDetailPageProps) => {
  const response = await fetch(`https://api.moaguide.com/content/report/${params.id}`, {
    cache: 'no-store'
  });

  const data: ReportListsItem = await response.json();

  return <ReportDetailIndex data={data} />;
};

export default ReportDetailPage;

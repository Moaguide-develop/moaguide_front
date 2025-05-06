import PracticeDetailIndex from '@/components/practice/PracticeDetailIndex';
import type { ArticleItem } from '@/types/homeComponentsType';
import React from 'react';

interface PracticeDetailPageProps {
  params: {
    id: string;
  };
}

const PracticeDetailPage = async ({ params }: PracticeDetailPageProps) => {
  const response = await fetch(
    `https://moaguide.n-e.kr/study/detail/article/${params.id}`,
    {
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: ArticleItem = await response.json();

  return <PracticeDetailIndex data={data} />;
};

export default PracticeDetailPage;

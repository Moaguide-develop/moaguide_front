'use client';

import Navbar from '@/components/common/Navbar';
import ArticleDetailClientWrapper from '@/components/learning/article/ArticleDetailClientWrapper';

interface PageProps {
  params: { articleId: string };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const articleId = params.articleId;

  return (
    <div className='min-h-[calc(100dvh-135.5px)] flex flex-col'>
      <Navbar />
      <ArticleDetailClientWrapper articleId={Number(articleId)} />
    </div>
  );
}
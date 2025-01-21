'use client';

import Navbar from '@/components/common/Navbar';
import ArticleDetailClientWrapper from '@/components/learning/article/ArticleDetailClientWrapper';
import { useLikeStore } from '@/store/articleLike.store';

interface PageProps {
  params: { articleId: string };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const articleId = params.articleId;
  const { likedByMe } = useLikeStore();
  console.log('Liked By Me:', likedByMe);

  return (
    <>
      <Navbar />
      <ArticleDetailClientWrapper articleId={Number(articleId)} />
    </>
  );
}
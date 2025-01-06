import ArticleDetailClientWrapper from '@/components/learning/article/ArticleDetailClientWrapper';

interface PageProps {
  params: { articleId: string };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const articleId = params.articleId;

  return (
    <ArticleDetailClientWrapper
      articleId={Number(articleId)}
    />
  );
}
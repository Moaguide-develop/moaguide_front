import Navbar from '@/components/common/Navbar';
import ArticleDetailClientWrapper from '@/components/learning/article/ArticleDetailClientWrapper';

interface PageProps {
  params: { articleId: string };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const articleId = params.articleId;

  return (
    <>
      <Navbar />
      <ArticleDetailClientWrapper articleId={Number(articleId)} />
    </>
  );
}
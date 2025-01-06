'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleDetailHeader from '@/components/learning/article/ArticleDetailHeader';
import ArticleDetailContent from '@/components/learning/article/ArticleDetailContent';
import { getArticleDetail } from '@/factory/Article/GetArticle';
import { ArticleDetail } from '@/types/learning';
import { useAuthStore } from '@/store/userAuth.store';

interface ArticleDetailClientWrapperProps {
  articleId: number;
}

const ArticleDetailClientWrapper = ({ articleId }: ArticleDetailClientWrapperProps) => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [data, setData] = useState<ArticleDetail | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/sign');
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getArticleDetail(articleId);
        setData(result);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [isLoggedIn, articleId, router]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <ArticleDetailHeader
        categoryName={data.categoryName}
        title={data.title}
        createdAt={data.createdAt}
        authorName={data.authorName}
        imgLink={data.imgLink}
      />
      <div className="max-w-[1000px] mx-auto my-6 text-sm text-gray-600">
        학습하기 &gt; 아티클 &gt; {data.categoryName}
      </div>
      <ArticleDetailContent
        text={data.text}
        createdAt={data.createdAt}
        authorName={data.authorName}
      />
    </div>
  );
};

export default ArticleDetailClientWrapper;
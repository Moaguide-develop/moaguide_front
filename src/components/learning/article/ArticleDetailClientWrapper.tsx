'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleDetailHeader from '@/components/learning/article/ArticleDetailHeader';
import ArticleDetailContent from '@/components/learning/article/ArticleDetailContent';
import { getArticleDetail } from '@/factory/Article/GetArticle';
import { ArticleDetail } from '@/types/learning';
import { useAuthStore } from '@/store/userAuth.store';
import Image from 'next/image';
import sharedIcon from '../../../../public/images/learning/articleShare.svg';
import likedIcon from '../../../../public/images/learning/articleLiked.svg';

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

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/learning/detail/${articleId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('URL이 복사되었습니다!');
    } catch (error) {
      console.error('URL 복사 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <ArticleDetailHeader
        categoryName={data.categoryName}
        title={data.title}
        createdAt={data.createdAt}
        authorName={data.authorName}
        imgLink={data.imgLink}
      />
      {/* todo: 화면 크기 작아지면 텍스트 영역 겹치는 부분 */}
      <div className="w-[90%] mx-auto py-12 flex items-center justify-between border-b border-[#ececec]">
        <div className="text-sm text-[#a0a0a0]">
          학습하기 &gt; 아티클 &gt; {data.categoryName}
        </div>
        <div className="absolute inset-x-0 text-center">
          <h1 className="text-lg font-semibold text-[#777777]">{data.title}</h1>
        </div>
        <div className="flex items-center gap-4 z-[9999]">
          <Image
            src={likedIcon}
            alt="좋아요 아이콘"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <button onClick={handleShare} aria-label="공유하기">
            <Image
              src={sharedIcon}
              alt="공유 아이콘"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <ArticleDetailContent
        text={data.text}
        title={data.title}
        createdAt={data.createdAt}
        authorName={data.authorName}
        imgLink={data.imgLink}
      />
    </div>
  );
};

export default ArticleDetailClientWrapper;